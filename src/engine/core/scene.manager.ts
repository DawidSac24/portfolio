// /src/engine/core/scene.manager.ts
import { LRUCache } from "./caches/lru.cache";
import type { Scene } from "../scenes/scene";

export class SceneManager {
  private static instance: SceneManager | null = null;
  private sceneCache: LRUCache<Scene>;

  public static getInstance(): SceneManager {
    if (!this.instance) {
      this.instance = new SceneManager();
    }
    return this.instance;
  }

  private constructor() {
    // Increase capacity to 5 or 6 since a single page might have 2-3 viewports
    this.sceneCache = new LRUCache<Scene>(6, (key, scene) => {
      console.log(`[SceneManager] Evicting & disposing scene: ${key}`);
      // This triggers Exhibit.dispose() -> AssetManager.release()!
      scene.dispose();
    });
  }

  public async acquireScene(
    sceneId: string,
    buildFn: () => Promise<Scene>,
  ): Promise<Scene> {
    let scene = this.sceneCache.get(sceneId);
    if (!scene) {
      scene = await buildFn();
      this.sceneCache.set(sceneId, scene);
    }
    return scene;
  }

  public clearAll(): void {
    this.sceneCache.clear();
  }
}
