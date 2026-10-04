import { AssetManager } from "../core/assets.manager";
import type { ExhibitModel } from "../models/exhibit.model";
import { SaturnModel } from "../models/saturn.model";
import { ExhibitFactory } from "./exhibit.factory";
import * as THREE from "three";

export class SaturnFactory extends ExhibitFactory<ExhibitModel> {
  public async build(): Promise<ExhibitModel> {
    const am = AssetManager.getInstance();

    const [saturnGroup, planetTex, ringTex] = await Promise.all([
      am.load<THREE.Group>("/models/saturn/saturn.obj"),
      am.load<THREE.Texture>("/models/saturn/planet.jpg"), // Adjust filenames as needed
      am.load<THREE.Texture>("/models/saturn/ring.png"),
    ]);

    // 2. Create the materials using the loaded textures
    const planetMaterial = new THREE.MeshStandardMaterial({ map: planetTex });

    // Rings need transparency if they are a PNG with a clear background
    const ringMaterial = new THREE.MeshStandardMaterial({
      map: ringTex,
      transparent: true,
      side: THREE.DoubleSide, // Render both top and bottom of the flat ring
    });

    // 3. Apply materials to the correct meshes
    saturnGroup.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Use console.log(mesh.name) here to see what the 3D artist named the parts!
        // It might be 'Sphere', 'Planet', 'Circle', etc.
        if (mesh.name.toLowerCase().includes("ring")) {
          mesh.material = ringMaterial;
        } else {
          mesh.material = planetMaterial;
        }
      }
    });

    return new SaturnModel(saturnGroup);
  }
}
