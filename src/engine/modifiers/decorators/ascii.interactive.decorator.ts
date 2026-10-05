// /src/engine/modifiers/decorators/interactive-ascii.decorator.ts
import * as THREE from "three";
import { ExhibitDecorator } from "./exhibit.decorator";
import type { Exhibit } from "../../exhibits/exhibit";

export class InteractiveAsciiDecorator extends ExhibitDecorator {
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2(-1, -1); // Default off-screen
  private shaderMat: THREE.ShaderMaterial | null = null;
  private isClicked = false;

  constructor(
    wrappedExhibit: Exhibit,
    private camera: THREE.PerspectiveCamera,
  ) {
    super(wrappedExhibit);

    // 1. Find the shader material applied by the previous decorator
    this.getMesh().traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.material && (mesh.material as THREE.ShaderMaterial).uniforms) {
        this.shaderMat = mesh.material as THREE.ShaderMaterial;
      }
    });

    // 2. Setup standard DOM Event Listeners
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("click", this.onClick);
  }

  private onPointerMove = (event: PointerEvent) => {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  private onClick = () => {
    // Toggle the effect on/off
    this.isClicked = !this.isClicked;
  };

  public override update(deltaTime: number): void {
    super.update(deltaTime); // Let Saturn spin!

    if (!this.shaderMat) return;

    // 1. Raycast every frame to see if the mouse is touching THIS model
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.getMesh(), true);

    if (intersects.length > 0) {
      // The mouse is hovering! Pass the UV coordinate to the shader
      const uv = intersects[0].uv;
      if (uv) {
        this.shaderMat.uniforms.u_mouse_uv.value = uv;
        // Smoothly increase scramble
        this.shaderMat.uniforms.u_scramble.value = THREE.MathUtils.lerp(
          this.shaderMat.uniforms.u_scramble.value,
          1.0,
          0.1,
        );
      }
    } else {
      // Mouse left the model. Move the UV off-screen and dial down scramble
      this.shaderMat.uniforms.u_mouse_uv.value.set(-1, -1);
      this.shaderMat.uniforms.u_scramble.value = THREE.MathUtils.lerp(
        this.shaderMat.uniforms.u_scramble.value,
        0.0,
        0.1,
      );
    }

    // 2. Handle the click fade out
    const targetOpacity = this.isClicked ? 0.0 : 1.0;
    this.shaderMat.uniforms.u_opacity.value = THREE.MathUtils.lerp(
      this.shaderMat.uniforms.u_opacity.value,
      targetOpacity,
      0.05,
    );
  }

  public override dispose(): void {
    // CRITICAL: Clean up window event listeners so they don't leak memory when switching pages!
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("click", this.onClick);
    super.dispose();
  }
}
