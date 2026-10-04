import type BaseEvent from "./base.event";

// 1. Define a strict type for a class constructor that creates a BaseEvent,
// using 'unknown[]' instead of 'any[]' for the arguments.
type EventConstructor = new (...args: unknown[]) => BaseEvent;

export class EventBus {
  private static instance: EventBus | null = null;

  // 2. No 'Function', no 'any'.
  // We strictly map our EventConstructor to a callback that takes a BaseEvent.
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
    // Cast the specific event constructor to our generic base constructor
    const key = eventType as unknown as EventConstructor;

    // Downcast the callback for internal storage. The public API guarantees
    // it will only ever be called with the correct type 'T'.
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
    // In JavaScript, every instance has a 'constructor' property pointing to its class.
    const key = event.constructor as EventConstructor;
    const callbacks = this.subscribers.get(key);

    if (callbacks) {
      callbacks.forEach((callback) => callback(event));
    }
  }
}
