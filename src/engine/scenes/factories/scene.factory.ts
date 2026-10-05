// scene.factory.ts
import { Scene } from "../scene";

export abstract class SceneFactory<T extends Scene> {
  public abstract build(): Promise<T>;
}
