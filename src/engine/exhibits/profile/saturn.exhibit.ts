import { Exhibit } from "../exhibit";
import * as THREE from "three";

export class SaturnModel extends Exhibit {
  private group: THREE.Group;

  public constructor(
    sourceUrl: string,
    rawAsset: unknown,
    desiredSize: number = 5,
  ) {
    const saturnMesh = ((rawAsset as { scene?: THREE.Object3D }).scene ||
      rawAsset) as THREE.Object3D;

    super(sourceUrl, saturnMesh);
    this.group = new THREE.Group();

    // 3. Calculate the current size of the wild internet model
    const boundingBox = new THREE.Box3().setFromObject(saturnMesh);
    const size = boundingBox.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    const scaleFactor = desiredSize / maxDimension;
    saturnMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

    const newBox = new THREE.Box3().setFromObject(saturnMesh);
    const center = newBox.getCenter(new THREE.Vector3());
    saturnMesh.position.sub(center);

    saturnMesh.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => (m.side = THREE.DoubleSide));
        } else {
          mesh.material.side = THREE.DoubleSide;
        }
      }
    });

    this.group.add(saturnMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.45);
    keyLight.position.set(5, 8, 5);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, -6, 3);

    this.group.add(ambientLight, keyLight, fillLight);
  }

  public override getMesh(): THREE.Object3D {
    return this.group;
  }

  public override update(deltaTime: number): void {
    this.group.rotation.y += deltaTime * 0.25;
  }

  protected override onDispose(): void {
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
