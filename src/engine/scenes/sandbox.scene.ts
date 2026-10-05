import * as THREE from "three";
import { ExhibitBuilder } from "../builders/exhibit.builder";
import { SaturnModel } from "../exhibits/saturn.exhibit";
import { Scene } from "./scene";
import { AsciiShaderDecorator } from "../modifiers/decorators/ascii.shader.decorator";
import { InteractiveAsciiDecorator } from "../modifiers/decorators/ascii.interactive.decorator";

export class SandboxScene extends Scene {
  public override async load(): Promise<void> {
    this.camera.position.z = 5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 5, 5);
    this.handle.add(ambientLight, directionalLight);

    const saturnBuilder = new ExhibitBuilder(
      "/models/imports/saturn_-_ringed_planet/scene.gltf",
      SaturnModel,
    );

    saturnBuilder
      .withDecorator(AsciiShaderDecorator)
      .withDecorator(InteractiveAsciiDecorator, this.camera);

    const saturn = await saturnBuilder.build();
    this.addExhibit(saturn);
  }

  public override enter(): void {}
  public override exit(): void {}
  protected override onUpdate(deltaTime: number): void {}
  protected override onDispose(): void {}
}
