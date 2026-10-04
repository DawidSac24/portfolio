import { ExhibitModel } from "../../models/exhibit.model";
import * as THREE from "three";

export abstract class ExhibitDecorator extends ExhibitModel {
  protected wrappedModel: ExhibitModel;

  constructor(model: ExhibitModel) {
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
