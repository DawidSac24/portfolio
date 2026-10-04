import * as THREE from "three";

export class AssetManager {
  private static instance: AssetManager | null = null;

  private loaderRegistry: Map<string, THREE.Loader>;
  private CachedAssets: Map<string, unknown>;

  public static getInstance(): AssetManager {
    if (this.instance == null) {
      this.instance = new AssetManager();
    }
    return this.instance;
  }

  private constructor() {
    this.loaderRegistry = new Map();
    this.CachedAssets = new Map();
  }

  public async load<T>(url: string): Promise<T> {
    if (this.CachedAssets.has(url)) {
      return this.CachedAssets.get(url) as T;
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

    this.CachedAssets.set(url, result);

    return result;
  }

  public registerLoader(extension: string, loader: THREE.Loader): void {
    this.loaderRegistry.set(extension, loader);
  }
}
