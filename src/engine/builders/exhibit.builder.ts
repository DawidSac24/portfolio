import type { Exhibit } from "../exhibits/exhibit";
import * as THREE from "three";
import type { ExhibitDecorator } from "../modifiers/decorators/exhibit.decorator";
import { AssetManager } from "../core/assets.manager";

interface GLTFPayload {
  scene?: THREE.Object3D;
}

export class ExhibitBuilder {
  private modelUrl: string;
  private baseClass: new (url: string, mesh: THREE.Object3D) => Exhibit;

  private pipeline: ((model: Exhibit) => Exhibit)[] = [];

  constructor(
    url: string,
    baseClass: new (url: string, mesh: THREE.Object3D) => Exhibit,
  ) {
    this.modelUrl = url;
    this.baseClass = baseClass;
  }

  public withDecorator<T extends ExhibitDecorator, Args extends unknown[]>(
    DecoratorClass: new (model: Exhibit, ...args: Args) => T,
    ...args: Args
  ): this {
    this.pipeline.push((model) => new DecoratorClass(model, ...args));
    return this;
  }

  public async build(): Promise<Exhibit> {
    const am = AssetManager.getInstance();
    const loadedAsset = await am.acquire<GLTFPayload>(this.modelUrl);
    const mesh = loadedAsset.scene
      ? loadedAsset.scene
      : (loadedAsset as unknown as THREE.Object3D);

    let exhibit: Exhibit = new this.baseClass(this.modelUrl, mesh);

    for (const wrapWithDecorator of this.pipeline) {
      exhibit = wrapWithDecorator(exhibit);
    }

    return exhibit;
  }
}
