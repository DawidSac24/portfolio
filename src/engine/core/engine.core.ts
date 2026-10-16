import * as THREE from "three";
import { LRUCache } from "./caches/lru.cache";
import type { Scene } from "../scenes/scene";

export class EngineCore {
  private static instance: EngineCore | null = null;

  private renderer: THREE.WebGLRenderer;
  private lastTime: number = 0;

  private sceneCache: LRUCache<Scene>;
  private activeScene: Scene | null = null;

  public static getInstance(): EngineCore {
    if (this.instance === null) {
      this.instance = new EngineCore();
    }
    return this.instance;
  }

  private constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    this.sceneCache = new LRUCache(3, (key, scene) => {
      console.log(`disposing of scene: ${key}`);
      scene.dispose();
    });

    window.addEventListener("resize", this.onWindowResize);
  }

  public mount(container: HTMLElement): void {
    container.appendChild(this.renderer.domElement);
    this.onWindowResize();

    requestAnimationFrame(this.loop);
  }

  public destroy(): void {
    this.sceneCache.clear();
    this.renderer.dispose();
  }

  public async switchScene(
    sceneId: string,
    buildFn: () => Promise<Scene>,
  ): Promise<void> {
    this.dropActiveScene();

    let nextScene = this.sceneCache.get(sceneId);

    if (!nextScene) {
      nextScene = await buildFn();
      this.sceneCache.set(sceneId, nextScene);
    }

    this.activeScene = nextScene;
    this.activeScene.enter();
  }

  public dropActiveScene(): void {
    this.activeScene?.exit();
    this.activeScene = null;
  }

  private loop = (time: number): void => {
    requestAnimationFrame(this.loop);

    const timeInSeconds = time * 0.001;
    const deltaTime = this.lastTime ? timeInSeconds - this.lastTime : 0;
    this.lastTime = timeInSeconds;

    if (this.activeScene) {
      this.activeScene.update(deltaTime);
      this.renderer.render(this.activeScene.handle, this.activeScene.camera);
    } else {
      this.renderer.clear();
    }
  };

  private onWindowResize = (): void => {
    const parent = this.renderer.domElement.parentElement;
    if (parent) {
      this.renderer.setSize(parent.clientWidth, parent.clientHeight);

      if (this.activeScene) {
        this.activeScene.camera.aspect =
          parent.clientWidth / parent.clientHeight;
        this.activeScene.camera.updateProjectionMatrix();
      }
    }
  };
}
