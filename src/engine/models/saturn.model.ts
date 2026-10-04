import { ExhibitModel } from "./exhibit.model";
import * as THREE from "three";

export class SaturnModel extends ExhibitModel {
  private group: THREE.Group;

  public constructor(saturnMesh: THREE.Object3D) {
    super();
    this.group = new THREE.Group();

    // 1. Calculate the current size of the wild internet model
    const boundingBox = new THREE.Box3().setFromObject(saturnMesh);
    const size = boundingBox.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    // 2. Mathematically force it to be exactly 4 units wide
    // (Since your camera is at Z=5, a 4-unit object fits perfectly on screen)
    const desiredSize = 4;
    const scaleFactor = desiredSize / maxDimension;
    saturnMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // 3. Recompute the box now that it's small, to find its exact center
    const newBox = new THREE.Box3().setFromObject(saturnMesh);
    const center = newBox.getCenter(new THREE.Vector3());

    // 4. Shift the model so its exact center aligns with the world's (0,0,0)
    saturnMesh.position.sub(center);

    this.group.add(saturnMesh);

    // 5. Bring the light back to a reasonable real-world number
    const ringLight = new THREE.SpotLight(0xffffff, 5.0);
    ringLight.position.set(10, 10, 5);
    ringLight.target = saturnMesh;

    this.group.add(ringLight);
  }

  public getMesh(): THREE.Object3D {
    return this.group;
  }

  public update(deltaTime: number): void {
    // Spin the group to see if the "line" reveals itself as the rings
    this.group.rotation.y += deltaTime * 0.5;
    this.group.rotation.x += deltaTime * 0.2;
  }

  protected onDispose(): void {
    this.group.traverse((child) => {
      // 2. Check if it's a mesh with geometry and materials
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        mesh.geometry.dispose(); // Free the vertex data

        // Materials can be a single object or an array of objects
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });

    // 3. (Optional but good practice) Clear the group itself
    this.group.clear();
  }
}
