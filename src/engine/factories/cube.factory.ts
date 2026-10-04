import { CubeModel } from "../models/cube.model";
import { ExhibitFactory } from "./exhibit.factory";

export class CubeFactory extends ExhibitFactory<CubeModel> {
  public async build(): Promise<CubeModel> {
    return new CubeModel();
  }
}
