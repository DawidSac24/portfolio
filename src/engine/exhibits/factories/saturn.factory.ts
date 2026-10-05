import { AssetManager } from "../../core/assets.manager";
import type { Exhibit } from "../exhibit";
import { SaturnModel } from "../saturn.exhibit";
import { ExhibitFactory } from "./exhibit.factory";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";

export class SaturnFactory extends ExhibitFactory<Exhibit> {
  public async build(): Promise<Exhibit> {
    const am = AssetManager.getInstance();

    // 1. Load the single .glb file
    const gltf = await am.load<GLTF>(
      "/models/imports/saturn_-_ringed_planet/scene.gltf",
    );

    // 2. Extract the pre-assembled, pre-textured group
    const saturnGroup = gltf.scene;

    return new SaturnModel(saturnGroup);
  }
}
