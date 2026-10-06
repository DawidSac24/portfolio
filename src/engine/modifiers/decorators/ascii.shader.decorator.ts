// /src/engine/modifiers/decorators/ascii-shader.decorator.ts
import * as THREE from "three";
import { ExhibitDecorator } from "./exhibit.decorator";
import type { Exhibit } from "../../exhibits/exhibit";

// Import our clean shader snippets
import asciiParsFragment from "../shaders/ascii_pars_frag.glsl?raw";
import asciiFragment from "../shaders/ascii_frag.glsl?raw";

export interface AsciiOptions {
  darkColor?: number | string;
  lightColor?: number | string;
  charSize?: number;
  hoverColor?: number | string;
  hoverRadius?: number;
}

export class AsciiShaderDecorator extends ExhibitDecorator {
  private targetMaterials: THREE.Material[] = [];

  constructor(wrappedExhibit: Exhibit, options: AsciiOptions = {}) {
    super(wrappedExhibit);

    // Default to a dark grey / white palette if nothing is passed
    const dColor = new THREE.Color(options.darkColor ?? 0x4a4a4a);
    const lColor = new THREE.Color(options.lightColor ?? 0xffffff);
    const size = options.charSize ?? 8.0;
    const hColor = new THREE.Color(options.hoverColor ?? 0xff0000); // Default Red
    const hRadius = options.hoverRadius ?? 0.15;

    this.getMesh().traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        const originalMat = (mesh.material as THREE.Material).clone();

        // THE FIX: Force Three.js to include UV variables in the shader,
        // even if the material is just a solid color.
        originalMat.defines = originalMat.defines || {};
        originalMat.defines.USE_UV = "";

        // Store uniforms in userData...
        originalMat.userData.uCharSize = { value: size };

        // Store uniforms in userData so we can update them at runtime
        originalMat.userData.uCharSize = { value: size };
        originalMat.userData.uColorDark = { value: dColor };
        originalMat.userData.uColorLight = { value: lColor };
        originalMat.userData.uHoverColor = { value: hColor };
        originalMat.userData.uMouseUv = {
          value: new THREE.Vector2(-1.0, -1.0),
        };
        originalMat.userData.uHoverRadius = { value: hRadius };

        originalMat.onBeforeCompile = (shader) => {
          // Link uniforms
          shader.uniforms.uCharSize = originalMat.userData.uCharSize;
          shader.uniforms.uColorDark = originalMat.userData.uColorDark;
          shader.uniforms.uColorLight = originalMat.userData.uColorLight;
          shader.uniforms.uHoverColor = originalMat.userData.uHoverColor;
          shader.uniforms.uMouseUv = originalMat.userData.uMouseUv;
          shader.uniforms.uHoverRadius = originalMat.userData.uHoverRadius;

          // Inject snippets
          shader.fragmentShader =
            asciiParsFragment + "\n" + shader.fragmentShader;
          shader.fragmentShader = shader.fragmentShader.replace(
            "#include <dithering_fragment>",
            asciiFragment,
          );
        };

        mesh.material = originalMat;
        this.targetMaterials.push(originalMat);
      }
    });
  }

  // Method to animate or swap colors dynamically during runtime!
  public setPalette(
    darkColor: number | string,
    lightColor: number | string,
  ): void {
    const dColor = new THREE.Color(darkColor);
    const lColor = new THREE.Color(lightColor);

    for (const mat of this.targetMaterials) {
      if (mat.userData.uColorDark) mat.userData.uColorDark.value.copy(dColor);
      if (mat.userData.uColorLight) mat.userData.uColorLight.value.copy(lColor);
    }
  }
  protected onDispose(): void {
    this.targetMaterials.forEach((mat) => mat.dispose());
  }
}
