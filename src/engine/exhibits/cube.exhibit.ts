import * as THREE from "three";
import { Exhibit } from "./exhibit";

export class CubeModel extends Exhibit {
  private mesh: THREE.Mesh;

  public constructor() {
    super();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
    this.mesh = new THREE.Mesh(geometry, material);
  }

  public override getMesh(): THREE.Object3D {
    return this.mesh;
  }

  public override update(deltaTime: number): void {
    // Implement the logic to update the Cube exhibit model based on the deltaTime
    // For example, you might want to update animations, state, or other properties
    this.mesh.rotation.x -= deltaTime * 0.5; // Rotate the cube around the X-axis
    this.mesh.rotation.y += deltaTime * 0.5; // Rotate the cube around the Y-axis
  }

  public override dispose(): void {
    // Implement any cleanup logic specific to the Cube exhibit model
    // For example, you might want to unsubscribe from events or release resources
    this.mesh.geometry.dispose();
  }
}
