import { Exhibit } from "../../exhibits/exhibit";
import * as THREE from "three";

export abstract class ExhibitDecorator extends Exhibit {
  protected wrappedModel: Exhibit;

  constructor(model: Exhibit) {
    super();
    this.wrappedModel = model;
  }

  public override getMesh(): THREE.Object3D {
    return this.wrappedModel.getMesh();
  }

  public override update(deltaTime: number): void {
    this.wrappedModel.update(deltaTime);
  }

  public override dispose(): void {
    this.wrappedModel.dispose();
  }
}
