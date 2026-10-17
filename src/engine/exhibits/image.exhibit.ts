// /src/engine/exhibits/image.exhibit.ts
import { Exhibit } from "./exhibit";
import * as THREE from "three";

export interface ImageOptions {
  width?: number;
  height?: number;
}

export class ImageExhibit extends Exhibit {
  private planeMesh: THREE.Mesh;

  public constructor(
    url: string,
    texture: unknown,
    options: ImageOptions = {},
  ) {
    super(url, new THREE.Group());

    const tex = texture as THREE.Texture;
    tex.colorSpace = THREE.SRGBColorSpace;

    const width = options.width ?? 3;
    const height = options.height ?? 3;

    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({
      map: tex,
      side: THREE.DoubleSide,
      transparent: true,
    });

    this.planeMesh = new THREE.Mesh(geometry, material);
    this.getMesh().add(this.planeMesh);
  }

  public override update(_deltaTime: number): void {}

  protected override onDispose(): void {
    this.planeMesh.geometry.dispose();
    if (Array.isArray(this.planeMesh.material)) {
      this.planeMesh.material.forEach((m) => m.dispose());
    } else {
      this.planeMesh.material.dispose();
    }
  }
}
