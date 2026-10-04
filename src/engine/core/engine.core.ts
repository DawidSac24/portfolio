import * as THREE from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import type { ExhibitModel } from "../models/exhibit.model";
import { AssetManager } from "./assets.manager";
import { TextureLoader } from "three";

interface ExtLoader {
  ext: string;
  loader: THREE.Loader;
}

const defaultLoaders: ExtLoader[] = [
  { ext: "stl", loader: new STLLoader() },
  { ext: "fbx", loader: new FBXLoader() },
  { ext: "obj", loader: new OBJLoader() },
  { ext: "jpg", loader: new TextureLoader() },
  { ext: "png", loader: new TextureLoader() },
];

export class EngineCore {
  private static instance: EngineCore | null = null;

  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private lastTime: number = 0;

  private directionalLight: THREE.DirectionalLight;
  private ambientLight: THREE.AmbientLight;

  private activeExhibit: ExhibitModel | null = null;

  public static getInstance(): EngineCore {
    if (this.instance === null) {
      this.instance = new EngineCore();
    }
    return this.instance;
  }

  private constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050505);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.z = 5;

    // Create a directional light (color, intensity)
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);

    // By default, it shines from directly above (0, 1, 0)
    // Move it back and up slightly so it hits the front of your models
    this.directionalLight.position.set(5, 10, 5);
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(this.ambientLight);

    defaultLoaders.forEach(({ ext, loader }) => {
      AssetManager.getInstance().registerLoader(ext, loader);
    });

    window.addEventListener("resize", this.onWindowResize);
  }

  public mount(container: HTMLElement): void {
    container.appendChild(this.renderer.domElement);
    this.onWindowResize();

    requestAnimationFrame(this.loop);
  }

  public destroy(): void {
    this.activeExhibit?.dispose();
    this.renderer.dispose();
    this.scene.clear();
  }

  private loop = (time: number): void => {
    requestAnimationFrame(this.loop);

    const timeInSeconds = time * 0.001;
    const deltaTime = this.lastTime ? timeInSeconds - this.lastTime : 0;
    this.lastTime = timeInSeconds;

    this.activeExhibit?.update(deltaTime);
    this.renderer.render(this.scene, this.camera);
  };

  public setExhibit(newExhibit: ExhibitModel | null): void {
    if (this.activeExhibit) {
      this.scene.remove(this.activeExhibit.getMesh());
      this.activeExhibit.dispose();
    }

    this.activeExhibit = newExhibit;

    if (this.activeExhibit) {
      this.scene.add(this.activeExhibit.getMesh());
    }
  }

  public setDefaultLights(enabled: boolean): void {
    this.directionalLight.visible = enabled;
    this.ambientLight.visible = enabled;
  }

  private onWindowResize = (): void => {
    const parent = this.renderer.domElement.parentElement;
    if (parent) {
      this.camera.aspect = parent.clientWidth / parent.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(parent.clientWidth, parent.clientHeight);
    }
  };
}
