// /src/engine/modifiers/decorators/interactive-ascii.decorator.ts
import * as THREE from "three";
import { ExhibitDecorator } from "./exhibit.decorator";
import type { Exhibit } from "../../exhibits/exhibit";

export class InteractiveAsciiDecorator extends ExhibitDecorator {
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2(-1, -1);
  private targetMaterials: THREE.Material[] = [];
  private camera: THREE.PerspectiveCamera;

  constructor(wrappedExhibit: Exhibit, camera: THREE.PerspectiveCamera) {
    super(wrappedExhibit);
    this.camera = camera;

    // Find all materials that have our custom uMouseUv injected
    this.getMesh().traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        if ((mesh.material as THREE.Material).userData.uMouseUv) {
          this.targetMaterials.push(mesh.material as THREE.Material);
        }
      }
    });

    window.addEventListener("pointermove", this.onPointerMove);
  }

  private onPointerMove = (event: PointerEvent) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  public override update(deltaTime: number): void {
    super.update(deltaTime);

    if (this.targetMaterials.length === 0) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.getMesh(), true);

    let targetUv = new THREE.Vector2(-1, -1); // Off-screen by default

    if (intersects.length > 0 && intersects[0].uv) {
      targetUv = intersects[0].uv;
    }

    // Pass the UV to all sub-materials
    for (const mat of this.targetMaterials) {
      // Use lerp for a smooth trailing/easing effect as the mouse moves
      mat.userData.uMouseUv.value.lerp(targetUv, 0.2);
    }
  }

  protected override onDispose(): void {
    window.removeEventListener("pointermove", this.onPointerMove);
    super.dispose();
  }
}
