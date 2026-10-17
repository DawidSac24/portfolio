import * as THREE from "three";
import { Exhibit } from "../exhibits/exhibit";
import type { PostProcessEffect } from "../modifiers/passes/post-process-effect.interface";

export abstract class Scene {
  public handle: THREE.Scene;
  public camera: THREE.PerspectiveCamera;

  protected exhibits: Exhibit[] = [];
  protected effects: PostProcessEffect[] = [];

  constructor() {
    this.handle = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.camera.position.z = 5;
  }

  public addExhibit(exhibit: Exhibit): void {
    this.exhibits.push(exhibit);
    this.handle.add(exhibit.getMesh());
  }

  public addEffect(effect: PostProcessEffect): void {
    this.effects.push(effect);
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

  public abstract load(): Promise<void>;
  public abstract enter(): void;
  public abstract exit(): void;
  protected abstract onUpdate(deltaTime: number): void;
  protected abstract onDispose(): void;
}
