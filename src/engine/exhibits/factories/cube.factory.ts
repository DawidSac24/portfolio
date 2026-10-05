import { CubeModel } from "../cube.exhibit";
import { ExhibitFactory } from "./exhibit.factory";
import { OutlineDecorator } from "../../modifiers/decorators/outline.decorator";
import type { Exhibit } from "../exhibit";

export class CubeFactory extends ExhibitFactory<Exhibit> {
  public async build(): Promise<Exhibit> {
    return new OutlineDecorator(new CubeModel());
  }
}
