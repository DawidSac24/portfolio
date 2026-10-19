import * as THREE from "three";
import { ExhibitBuilder } from "../builders/exhibit.builder";
import { SaturnModel } from "../exhibits/profile/saturn.exhibit";
import { Scene } from "./scene";
import {
  // AsciiEffect,
  ColoredAsciiEffect,
} from "../modifiers/passes/ascii.effect";

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

    const saturn = await saturnBuilder.build();
    this.addExhibit(saturn);

    this.addEffect(
      new ColoredAsciiEffect({
        charSize: 7.0,
        // hoverColor: "#ffffff",
        hoverRadius: 0.2,
      }),
    );

    // this.addEffect(
    //   new AsciiEffect({
    //     darkColor: "#3a3a3a",
    //     lightColor: "#ffffff",
    //     // hoverColor: "#8bac0f",
    //     charSize: 7.0,
    //   }),
    // );
  }

  public override enter(): void {}
  public override exit(): void {}
  protected override onUpdate(_deltaTime: number): void {}
  protected override onDispose(): void {}
}
