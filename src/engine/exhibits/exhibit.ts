import type BaseEvent from "../events/base.event";
import { EventBus } from "../events/event.bus";
import * as THREE from "three";

export abstract class Exhibit {
  private eventBus = EventBus.getInstance();
  private subs: Array<() => void> = [];

  public dispose(): void {
    this.subs.forEach((unsubscribe) => unsubscribe());
    this.subs = [];

    this.onDispose();
  }
  public abstract getMesh(): THREE.Object3D;

  public abstract update(deltaTime: number): void;

  protected abstract onDispose(): void;

  protected subscribe<T extends BaseEvent>(
    eventType: new (...args: unknown[]) => T,
    callback: (event: T) => void,
  ): void {
    this.subs.push(this.eventBus.subscribe(eventType, callback));
  }
}
