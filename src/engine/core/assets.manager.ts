import { RefCountCache } from "./caches/ref-count.cache";
import * as THREE from "three";
import * as parse from "../../utils/ThreeParser";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextureLoader } from "three";

interface ExtLoader {
  ext: string;
  loader: THREE.Loader;
}
const defaultLoaders: ExtLoader[] = [
  { ext: "stl", loader: new STLLoader() },
  { ext: "fbx", loader: new FBXLoader() },
  { ext: "obj", loader: new OBJLoader() },
  { ext: "glb", loader: new GLTFLoader() },
  { ext: "gltf", loader: new GLTFLoader() },
  { ext: "jpg", loader: new TextureLoader() },
  { ext: "png", loader: new TextureLoader() },
];

export class AssetManager {
  private static instance: AssetManager | null = null;

  private loaderRegistry: Map<string, THREE.Loader>;
  private cache: RefCountCache<unknown>;

  public static getInstance(): AssetManager {
    if (this.instance == null) {
      this.instance = new AssetManager();
    }
    return this.instance;
  }

  private constructor() {
    this.loaderRegistry = new Map();
    this.cache = new RefCountCache<unknown>((url, asset) => {
      console.log(`[VRAM Purge] Zero references for: ${url}`);
      this.disposeThreeAsset(asset);
    });

    defaultLoaders.forEach(({ ext, loader }) => {
      this.registerLoader(ext, loader);
    });
  }

  public registerLoader(extension: string, loader: THREE.Loader): void {
    this.loaderRegistry.set(extension, loader);
  }

  public async acquire<T>(url: string): Promise<T> {
    if (this.cache.has(url)) {
      return this.cache.retain(url) as T;
    }

    const ext = url.split(".").pop();
    if (!ext) {
      throw new Error(`Cannot determine file extension for URL: ${url}`);
    }
    const loader = this.loaderRegistry.get(ext);
    if (!loader) {
      throw new Error(`No loader registered for extension: ${ext}`);
    }

    const result = (await loader.loadAsync(url)) as T;

    this.cache.add(url, result);

    return result;
  }

  public release(url: string): void {
    this.cache.retain(url);
  }

  private disposeThreeAsset(asset: unknown): void {
    if (!asset) return;

    const target = parse.isGLTF(asset) ? asset.scene : asset;

    if (parse.isTexture(target)) {
      target.dispose();
      return;
    }

    if (parse.isObject3D(target)) {
      target.traverse((child) => {
        if (parse.isMesh(child)) {
          this.disposeMesh(child);
        }
      });
    }
  }

  private disposeMaterial(material: THREE.Material): void {
    const matRecord = material as unknown as Record<string, unknown>;

    for (const key in matRecord) {
      const property = matRecord[key];
      if (parse.isTexture(property)) {
        property.dispose();
      }
    }
    material.dispose();
  }

  private disposeMesh(mesh: THREE.Mesh): void {
    if (mesh.geometry) mesh.geometry.dispose();

    if (mesh.material) {
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      materials.forEach((mat) => this.disposeMaterial(mat));
    }
  }
}
