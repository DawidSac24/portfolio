import type { Pass } from "three/examples/jsm/postprocessing/Pass.js";

export interface PostProcessEffect {
  readonly pass: Pass;

  onResize?(width: number, height: number, pixelRatio: number): void;
  onMouseMove?(normalizedX: number, normalizedY: number): void;
  onUpdate?(deltaTime: number): void;
  dispose?(): void;
}
