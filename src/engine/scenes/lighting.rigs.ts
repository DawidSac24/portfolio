// /engine/scenes/lighting.rigs.ts
import * as THREE from "three";

export type LightingRig = (scene: THREE.Scene) => void;

export const StandardStudioRig: LightingRig = (scene) => {
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  const directional = new THREE.DirectionalLight(0xffffff, 1.0);
  directional.position.set(5, 5, 5);
  scene.add(ambient, directional);
};

export const MoodyDramaticRig: LightingRig = (scene) => {
  const ambient = new THREE.AmbientLight(0x404040, 0.2);
  const spot = new THREE.SpotLight(0xffa95c, 2.0);
  spot.position.set(0, 5, 0);
  spot.angle = Math.PI / 6;
  scene.add(ambient, spot);
};
