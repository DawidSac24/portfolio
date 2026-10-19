// /src/engine/exhibits/smartframe/MatrixPortalS3Mesh.ts
import * as THREE from "three";

export class MatrixPortalS3Mesh extends THREE.Group {
  constructor() {
    super();

    // 1. Purple Adafruit FR4 PCB substrate
    const pcbGeo = new THREE.BoxGeometry(1.8, 1.0, 0.04);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x3d1054, // Signature Adafruit purple
      roughness: 0.3,
      metalness: 0.1,
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    this.add(pcb);

    // 2. ESP32-S3 WROOM Module (Metallic silver shield)
    const espGeo = new THREE.BoxGeometry(0.7, 0.6, 0.08);
    const espMat = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      metalness: 0.85,
      roughness: 0.25,
    });
    const espShield = new THREE.Mesh(espGeo, espMat);
    espShield.position.set(0.2, 0.05, 0.05);
    this.add(espShield);

    // 3. USB-C Port
    const usbGeo = new THREE.BoxGeometry(0.25, 0.2, 0.1);
    const usbMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.9,
      roughness: 0.2,
    });
    const usbPort = new THREE.Mesh(usbGeo, usbMat);
    usbPort.position.set(-0.85, 0.15, 0.05);
    this.add(usbPort);

    // 4. HUB75 Female Socket (Connects board to panel)
    const socketGeo = new THREE.BoxGeometry(1.2, 0.3, 0.3);
    const socketMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.7,
    });
    const socket = new THREE.Mesh(socketGeo, socketMat);
    socket.position.set(0.0, -0.3, -0.15);
    this.add(socket);

    // 5. Activity Status LED (Tiny neo-pixel indicator)
    const statusLedGeo = new THREE.BoxGeometry(0.06, 0.06, 0.03);
    const statusLedMat = new THREE.MeshBasicMaterial({ color: 0x00ff66 });
    const statusLed = new THREE.Mesh(statusLedGeo, statusLedMat);
    statusLed.position.set(-0.5, 0.25, 0.04);
    this.add(statusLed);
  }
}
