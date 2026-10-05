import * as THREE from "three";
import { Exhibit } from "../exhibits/exhibit";

export abstract class Scene {
  public handle: THREE.Scene;
  public camera: THREE.PerspectiveCamera;

  protected exhibits: Exhibit[] = [];

  constructor() {
    this.handle = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.z = 5;
  }

  public addExhibit(exhibit: Exhibit): void {
    this.exhibits.push(exhibit);
    this.handle.add(exhibit.getMesh());
  }

  public update(deltaTime: number): void {
    this.onUpdate(deltaTime);
    this.exhibits.forEach((exhibit) => exhibit.update(deltaTime));
  }

  public dispose(): void {
    this.onDispose();
    this.exhibits.forEach((exhibit) => exhibit.dispose());
    this.handle.clear();
  }

  public abstract load(): Promise<void>;
  public abstract enter(): void;
  public abstract exit(): void;
  protected abstract onUpdate(deltaTime: number): void;
  protected abstract onDispose(): void;
}
