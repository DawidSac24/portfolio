import * as THREE from "three";

export abstract class Exhibit {
  public abstract getMesh(): THREE.Object3D;
  public abstract update(deltaTime: number): void;
  public abstract dispose(): void;
}
