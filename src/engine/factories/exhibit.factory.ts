import type { ExhibitModel } from "../models/exhibit.model";

export abstract class ExhibitFactory<T extends ExhibitModel> {
  public abstract build(): Promise<T>;
}
