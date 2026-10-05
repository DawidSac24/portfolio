import * as THREE from "three";
import { Exhibit } from "../exhibits/exhibit";

export abstract class Scene {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;

  protected exhibits: Exhibit[] = [];
  protected subs: (() => void)[] = []; // EventBus unsubscribe tokens

  constructor() {
    this.scene = new THREE.Scene();

    // Every scene gets its own camera so it can control it independently
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
  }

  public addExhibit(exhibit: Exhibit): void {
    this.exhibits.push(exhibit);
    this.scene.add(exhibit.getMesh());
  }

  public update(deltaTime: number): void {
    this.exhibits.forEach((exhibit) => exhibit.update(deltaTime));

    this.onUpdate(deltaTime);
  }

  public dispose(): void {
    this.subs.forEach((unsub) => unsub()); // Clear event listeners
    this.exhibits.forEach((exhibit) => exhibit.dispose()); // Destroy models
    this.scene.clear();
    this.onDispose();
  }

  protected abstract onUpdate(deltaTime: number): void;
  protected abstract onDispose(): void;
}
