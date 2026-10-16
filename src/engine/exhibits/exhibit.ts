import * as THREE from "three";
import { AssetManager } from "../core/assets.manager";

export abstract class Exhibit {
  private sourceUrl: string;
  protected mesh: THREE.Object3D;

  protected constructor(sourceUrl: string, mesh: THREE.Object3D) {
    this.sourceUrl = sourceUrl;
    this.mesh = mesh;
  }

  public getMesh(): THREE.Object3D {
    return this.mesh;
  }

  public getSourceUrl(): string {
    return this.sourceUrl;
  }

  public dispose(): void {
    this.onDispose();
    AssetManager.getInstance().release(this.sourceUrl);
  }

  public abstract update(deltaTime: number): void;
  protected abstract onDispose(): void;
}
