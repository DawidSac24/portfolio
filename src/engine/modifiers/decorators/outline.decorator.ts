import type { Exhibit } from "../../exhibits/exhibit";
import { ExhibitDecorator } from "./exhibit.decorator";
import * as THREE from "three";

export class OutlineDecorator extends ExhibitDecorator {
  constructor(model: Exhibit) {
    super(model);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 1,
    });

    model.getMesh().traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const edges = new THREE.EdgesGeometry(mesh.geometry);
        const line = new THREE.LineSegments(edges, lineMaterial);

        mesh.add(line);
      }
    });
  }
}
