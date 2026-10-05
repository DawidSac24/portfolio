import type BaseEvent from "./base.event";

type EventConstructor = new (...args: unknown[]) => BaseEvent;

export class EventBus {
  private static instance: EventBus | null = null;

  private subscribers: Map<EventConstructor, Array<(event: BaseEvent) => void>>;

  private constructor() {
    this.subscribers = new Map();
  }

  public static getInstance(): EventBus {
    if (this.instance == null) {
      this.instance = new EventBus();
    }
    return this.instance;
  }

  public subscribe<T extends BaseEvent>(
    eventType: new (...args: unknown[]) => T,
    callback: (event: T) => void,
  ): () => void {
    const key = eventType as unknown as EventConstructor;

    const genericCallback = callback as (event: BaseEvent) => void;

    const callbacks = this.subscribers.get(key) || [];
    this.subscribers.set(key, [...callbacks, genericCallback]);

    return () => {
      const currentCallbacks = this.subscribers.get(key);
      if (currentCallbacks) {
        this.subscribers.set(
          key,
          currentCallbacks.filter((cb) => cb !== genericCallback),
        );
      }
    };
  }

  public emit<T extends BaseEvent>(event: T): void {
    const key = event.constructor as EventConstructor;
    const callbacks = this.subscribers.get(key);

    if (callbacks) {
      callbacks.forEach((callback) => callback(event));
    }
  }
}
