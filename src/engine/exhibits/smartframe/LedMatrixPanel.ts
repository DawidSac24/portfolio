// /src/engine/exhibits/smartframe/LedMatrixPanel.ts
import * as THREE from "three";

export class LedMatrixPanel extends THREE.Group {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  private texture: THREE.CanvasTexture;
  private screenMesh: THREE.Mesh;
  private leds: THREE.InstancedMesh;

  public readonly cols: number;
  public readonly rows: number;

  constructor(
    width: number = 4.0,
    height: number = 4.0,
    cols: number = 64,
    rows: number = 64,
  ) {
    super();
    this.cols = cols;
    this.rows = rows;

    // 1. Off-screen canvas acting as your simulated display VRAM
    this.canvas = document.createElement("canvas");
    this.canvas.width = cols;
    this.canvas.height = rows;
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error("Could not acquire 2D context");
    this.ctx = context;

    // Fill with default standby test pattern
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, cols, rows);

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.magFilter = THREE.NearestFilter; // Sharp pixel edges
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.colorSpace = THREE.SRGBColorSpace;

    // 2. Base Display Plane (Emissive face)
    const planeGeo = new THREE.PlaneGeometry(width, height);
    const planeMat = new THREE.MeshStandardMaterial({
      map: this.texture,
      roughness: 0.8,
      metalness: 0.1,
    });
    this.screenMesh = new THREE.Mesh(planeGeo, planeMat);
    this.add(this.screenMesh);

    // 3. Physical LED Beads (InstancedMesh for GPU efficiency)
    const ledCount = cols * rows;
    const ledGeo = new THREE.BoxGeometry(
      (width / cols) * 0.75,
      (height / rows) * 0.75,
      0.04,
    );
    const ledMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.4,
      metalness: 0.2,
    });

    this.leds = new THREE.InstancedMesh(ledGeo, ledMat, ledCount);
    const dummy = new THREE.Object3D();
    const xStep = width / cols;
    const yStep = height / rows;
    const xOffset = -width / 2 + xStep / 2;
    const yOffset = height / 2 - yStep / 2;

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dummy.position.set(xOffset + c * xStep, yOffset - r * yStep, 0.02);
        dummy.updateMatrix();
        this.leds.setMatrixAt(idx++, dummy.matrix);
      }
    }
    this.leds.instanceMatrix.needsUpdate = true;
    this.add(this.leds);

    // 4. Structural Backing (Black fiberglass panel)
    const backGeo = new THREE.BoxGeometry(width, height, 0.15);
    const backMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.9,
    });
    const backMesh = new THREE.Mesh(backGeo, backMat);
    backMesh.position.z = -0.08;
    this.add(backMesh);
  }

  // Draw any pixel content onto the matrix programmatically
  public updateDisplay(drawFn: (ctx: CanvasRenderingContext2D) => void): void {
    drawFn(this.ctx);
    this.texture.needsUpdate = true;
  }
}
