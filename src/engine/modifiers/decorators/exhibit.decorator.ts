import { Exhibit } from "../../exhibits/exhibit";
import * as THREE from "three";

export abstract class ExhibitDecorator extends Exhibit {
  protected wrappedModel: Exhibit;

  constructor(model: Exhibit) {
    super();
    this.wrappedModel = model;
  }

  public getMesh(): THREE.Object3D {
    return this.wrappedModel.getMesh();
  }

  public update(deltaTime: number): void {
    this.wrappedModel.update(deltaTime);
  }

  protected onDispose(): void {
    this.wrappedModel.dispose();
  }
}
