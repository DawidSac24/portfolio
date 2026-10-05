import type { Exhibit } from "../exhibit";

export abstract class ExhibitFactory<T extends Exhibit> {
  public abstract build(): Promise<T>;
}
