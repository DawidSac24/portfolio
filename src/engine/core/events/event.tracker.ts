import type BaseEvent from "./base.event";
import { EventBus } from "./event.bus";

export class EventTracker {
  private eventBus = EventBus.getInstance();
  private subs: Array<() => void> = [];

  protected listenTo<T extends BaseEvent>(
    event: new (...args: unknown[]) => T,
    callback: (event: T) => void,
  ): void {
    this.subs.push(this.eventBus.subscribe<T>(event, callback));
  }

  public dispose(): void {
    this.subs.forEach((unsubscribe) => unsubscribe());
    this.subs = [];
  }
}
