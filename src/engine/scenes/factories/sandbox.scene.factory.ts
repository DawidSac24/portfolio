// sandbox.scene.factory.ts
import { SceneFactory } from "./scene.factory";
import { SandboxScene } from "../scenes/sandbox.scene";
import { SaturnFactory } from "../factories/saturn.factory";

export class SandboxSceneFactory extends SceneFactory<SandboxScene> {
  public async build(): Promise<SandboxScene> {
    const scene = new SandboxScene();

    // The factory orchestrates all the heavy lifting
    const saturn = await new SaturnFactory().build();
    scene.addExhibit(saturn);

    return scene;
  }
}
