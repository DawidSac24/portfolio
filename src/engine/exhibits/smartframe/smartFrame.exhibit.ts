// /src/engine/exhibits/smartframe/SmartFrameExhibit.ts
import * as THREE from "three";
import { Exhibit } from "../exhibit";
import { LedMatrixPanel } from "./LedMatrixPanel";
import { MatrixPortalS3Mesh } from "./MatrixPortalS3Mesh";

export class SmartFrameExhibit extends Exhibit {
  public readonly matrix: LedMatrixPanel;
  public readonly controller: MatrixPortalS3Mesh;
  private targetRotationY: number = 0;

  constructor(url: string, rawAsset: unknown) {
    const group = new THREE.Group();
    super(url, group);

    let frameMesh: THREE.Object3D;

    // 1. Properly detect and wrap raw BufferGeometry
    if (
      rawAsset instanceof THREE.BufferGeometry ||
      (rawAsset && (rawAsset as THREE.BufferGeometry).isBufferGeometry)
    ) {
      const geometry = rawAsset as THREE.BufferGeometry;
      geometry.computeVertexNormals();

      const plaMaterial = new THREE.MeshStandardMaterial({
        color: 0x1f242d, // Dark matte plastic
        roughness: 0.85,
        metalness: 0.1,
        side: THREE.DoubleSide,
      });

      // Wrap the geometry in a Mesh FIRST so setFromObject works!
      frameMesh = new THREE.Mesh(geometry, plaMaterial);
    } else if ((rawAsset as { scene?: THREE.Object3D })?.scene) {
      frameMesh = (rawAsset as { scene: THREE.Object3D }).scene;
    } else {
      frameMesh = rawAsset as THREE.Object3D;
    }

    // 2. Now frameMesh is guaranteed to be a THREE.Object3D, so setFromObject won't crash
    const box = new THREE.Box3().setFromObject(frameMesh);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = 4.2 / (maxDim || 1);
    frameMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // 3. Center the mesh at origin
    const centeredBox = new THREE.Box3().setFromObject(frameMesh);
    const center = centeredBox.getCenter(new THREE.Vector3());
    frameMesh.position.sub(center);
    group.add(frameMesh);

    // 4. Attach LED Matrix and Controller
    this.matrix = new LedMatrixPanel(3.8, 3.8, 64, 64);
    this.matrix.position.set(0, 0, 0.08);
    group.add(this.matrix);

    this.controller = new MatrixPortalS3Mesh();
    this.controller.position.set(0, -0.3, -0.22);
    group.add(this.controller);

    this.drawDefaultUI();
  }

  private drawDefaultUI(): void {
    this.matrix.updateDisplay((ctx) => {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, 64, 64);

      ctx.fillStyle = "#8bac0f";
      ctx.font = "bold 9px monospace";
      ctx.fillText("12:45", 16, 26);

      ctx.fillStyle = "#ffffff";
      ctx.font = "7px monospace";
      ctx.fillText("ESP-IDF", 15, 40);

      ctx.fillStyle = "#22c55e";
      ctx.fillRect(8, 18, 3, 3);
    });
  }

  public setTargetAngle(rad: number): void {
    this.targetRotationY = rad;
  }

  public override update(deltaTime: number): void {
    this.mesh.rotation.y = THREE.MathUtils.damp(
      this.mesh.rotation.y,
      this.targetRotationY,
      4.0,
      deltaTime,
    );
  }

  protected override onDispose(): void {
    (this.mesh as THREE.Group).clear();
  }
}
