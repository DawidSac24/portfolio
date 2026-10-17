import type { Exhibit } from "../exhibits/exhibit";
import type { ExhibitDecorator } from "../modifiers/decorators/exhibit.decorator";
import { AssetManager } from "../core/assets.manager";

type ExhibitConstructor<Args extends unknown[]> = new (
  url: string,
  asset: unknown,
  ...args: Args
) => Exhibit;

export class ExhibitBuilder<Args extends unknown[] = unknown[]> {
  private modelUrl: string;
  private baseClass: ExhibitConstructor<Args>;
  private constructorArgs: Args;
  private pipeline: ((model: Exhibit) => Exhibit)[] = [];

  constructor(url: string, baseClass: ExhibitConstructor<Args>, ...args: Args) {
    this.modelUrl = url;
    this.baseClass = baseClass;
    this.constructorArgs = args;
  }

  public withDecorator<
    T extends ExhibitDecorator,
    DecoratorArgs extends unknown[],
  >(
    DecoratorClass: new (model: Exhibit, ...args: DecoratorArgs) => T,
    ...args: DecoratorArgs
  ): this {
    this.pipeline.push((model) => new DecoratorClass(model, ...args));
    return this;
  }

  public async build(): Promise<Exhibit> {
    const am = AssetManager.getInstance();
    const asset = await am.acquire<unknown>(this.modelUrl);

    let exhibit: Exhibit = new this.baseClass(
      this.modelUrl,
      asset,
      ...this.constructorArgs,
    );

    for (const wrapWithDecorator of this.pipeline) {
      exhibit = wrapWithDecorator(exhibit);
    }

    return exhibit;
  }
}
