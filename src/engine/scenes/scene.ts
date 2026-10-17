// /src/engine/scenes/scene.ts
import * as THREE from "three";
import { Exhibit } from "../exhibits/exhibit";
import type { PostProcessEffect } from "../modifiers/passes/post-process-effect.interface";
import type { LightingRig } from "./lighting.rigs";

export class Scene {
  public handle: THREE.Scene;
  public camera: THREE.PerspectiveCamera;

  protected exhibits: Exhibit[] = [];
  protected effects: PostProcessEffect[] = [];

  constructor() {
    this.handle = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.camera.position.z = 5;
  }

  public addExhibit(exhibit: Exhibit): this {
    this.exhibits.push(exhibit);
    this.handle.add(exhibit.getMesh());
    return this;
  }

  public addEffect(effect: PostProcessEffect): this {
    this.effects.push(effect);
    return this;
  }

  public withLighting(rig: LightingRig): this {
    rig(this.handle);
    return this;
  }

  public getEffects(): readonly PostProcessEffect[] {
    return this.effects;
  }

  public update(deltaTime: number): void {
    this.onUpdate(deltaTime);
    this.exhibits.forEach((exhibit) => exhibit.update(deltaTime));
    this.effects.forEach((effect) => effect.onUpdate?.(deltaTime));
  }

  public dispose(): void {
    this.onDispose();
    this.exhibits.forEach((exhibit) => exhibit.dispose());
    this.effects.forEach((effect) => effect.dispose?.());
    this.handle.clear();
  }

  public async load(): Promise<void> {}
  public enter(): void {}
  public exit(): void {}
  protected onUpdate(_deltaTime: number): void {}
  protected onDispose(): void {}
}
