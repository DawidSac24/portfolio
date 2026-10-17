// /src/engine/modifiers/passes/ascii.effect.ts
import * as THREE from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import type { PostProcessEffect } from "./post-process-effect.interface";

import vertexShader from "../shaders/ascii_pass.vert?raw";
import fragmentShader from "../shaders/ascii_pass.frag?raw";

export interface AsciiEffectOptions {
  useOriginalColor?: boolean;
  darkColor?: number | string;
  lightColor?: number | string;
  hoverColor?: number | string;
  charSize?: number;
  hoverRadius?: number;
}

export class AsciiEffect implements PostProcessEffect {
  public readonly pass: ShaderPass;

  private targetMouse = new THREE.Vector2(-10, -10);
  private currentMouse = new THREE.Vector2(-10, -10);

  constructor(options: AsciiEffectOptions = {}) {
    const dColor = new THREE.Color(options.darkColor ?? 0x4a4a4a);
    const lColor = new THREE.Color(options.lightColor ?? 0xffffff);
    const hasHover = options.hoverColor !== undefined;
    const hColor = new THREE.Color(options.hoverColor ?? 0xffffff);

    this.pass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uCharSize: { value: options.charSize ?? 8.0 },
        uColorDark: { value: dColor },
        uColorLight: { value: lColor },
        uHoverColor: { value: hColor },
        uMouseScreen: { value: new THREE.Vector2(-10, -10) },
        uHoverRadius: { value: options.hoverRadius ?? 0.2 },
        uUseOriginalColor: { value: options.useOriginalColor ?? false },
        uUseHover: { value: hasHover },
      },
      vertexShader,
      fragmentShader,
    });
  }

  public onResize(width: number, height: number, pixelRatio: number): void {
    this.pass.uniforms.uResolution.value.set(
      width * pixelRatio,
      height * pixelRatio,
    );
  }

  public onMouseMove(normalizedX: number, normalizedY: number): void {
    this.targetMouse.set(normalizedX, normalizedY);
  }

  public onUpdate(_deltaTime: number): void {
    this.currentMouse.lerp(this.targetMouse, 0.15);
    this.pass.uniforms.uMouseScreen.value.copy(this.currentMouse);
  }

  public dispose(): void {
    this.pass.dispose();
  }
}

export class ColoredAsciiEffect extends AsciiEffect {
  constructor(
    options: Omit<
      AsciiEffectOptions,
      "useOriginalColor" | "darkColor" | "lightColor"
    > = {},
  ) {
    super({ ...options, useOriginalColor: true });
  }
}
