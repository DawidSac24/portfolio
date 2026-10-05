import { isObject } from "./parser.ts";
import * as THREE from "three";

const isGLTF = (item: unknown): item is { scene: THREE.Object3D } =>
  isObject(item) && isObject(item.scene);

const isTexture = (item: unknown): item is THREE.Texture =>
  isObject(item) && item.isTexture === true;

const isObject3D = (item: unknown): item is THREE.Object3D =>
  isObject(item) && typeof item.traverse === "function";

const isMesh = (item: unknown): item is THREE.Mesh =>
  isObject(item) && item.isMesh === true;

export { isGLTF, isTexture, isObject3D, isMesh };
