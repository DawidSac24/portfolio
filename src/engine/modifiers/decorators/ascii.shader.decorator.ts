import * as THREE from "three";
import { ExhibitDecorator } from "./exhibit.decorator";
import type { Exhibit } from "../../exhibits/exhibit";

// Notice the ?raw suffix! This imports the file as a pure string.
import vertexShader from "../shaders/ascii.vert?raw";
import fragmentShader from "../shaders/ascii.frag?raw";

export class AsciiShaderDecorator extends ExhibitDecorator {
  public shaderMaterial: THREE.ShaderMaterial;

  constructor(wrappedExhibit: Exhibit) {
    super(wrappedExhibit);

    this.shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        tDiffuse: { value: null }, // We will inject the original texture here
        u_mouse_uv: { value: new THREE.Vector2(-1, -1) }, // Start off-screen
        u_scramble: { value: 0.0 },
        u_opacity: { value: 1.0 }, // 1.0 means the effect is fully ON
      },
    });

    this.getMesh().traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        // Grab the original texture (assuming it's a Standard Material)
        const originalMat = mesh.material as THREE.MeshStandardMaterial;

        if (originalMat.map) {
          this.shaderMaterial.uniforms.tDiffuse.value = originalMat.map;
        }

        // Swap the material!
        mesh.material = this.shaderMaterial;
      }
    });
  }

  protected onDispose(): void {
    this.shaderMaterial.dispose();
  }
}
