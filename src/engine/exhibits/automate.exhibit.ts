import { Exhibit } from "./exhibit";
import * as THREE from "three";

export class AutoMateExhibit extends Exhibit {
  private group: THREE.Group;

  constructor(url: string, rawAsset: unknown, desiredSize: number = 5) {
    const gltfScene =
      (rawAsset as { scene?: THREE.Object3D }).scene ||
      (rawAsset as THREE.Object3D);
    super(url, gltfScene);

    this.group = new THREE.Group();

    // Normalize scale based on desired size
    const boundingBox = new THREE.Box3().setFromObject(gltfScene);
    const size = boundingBox.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scaleFactor = desiredSize / maxDimension;
    gltfScene.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // Center the assembly
    const newBox = new THREE.Box3().setFromObject(gltfScene);
    const center = newBox.getCenter(new THREE.Vector3());
    gltfScene.position.sub(center);

    // Enable double-sided rendering for CAD exports
    gltfScene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => (m.side = THREE.DoubleSide));
        } else {
          mesh.material.side = THREE.DoubleSide;
        }
      }
    });

    this.group.add(gltfScene);

    // Studio Lighting for CAD Models
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 5);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, -6, 3);

    this.group.add(ambientLight, keyLight, fillLight);
  }

  public override getMesh(): THREE.Object3D {
    return this.group;
  }

  public override update(deltaTime: number): void {
    // Slowly rotate the entire assembly to show off the mechanics
    this.group.rotation.y += deltaTime * 0.15;

    // Future: Grab specific parts like `this.group.getObjectByName("Electromagnet")` and animate them here!
  }

  protected override onDispose(): void {
    this.group.clear();
  }
}
