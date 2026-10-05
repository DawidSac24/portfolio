interface RefItem<T> {
  data: T;
  refCount: number;
}

export class RefCountCache<T> {
  private map: Map<string, RefItem<T>>;
  private onZeroRefs?: (key: string, data: T) => void;

  constructor(onZeroRefs?: (key: string, data: T) => void) {
    this.map = new Map();
    this.onZeroRefs = onZeroRefs;
  }

  public has(key: string): boolean {
    return this.map.has(key);
  }

  public add(key: string, data: T): void {
    this.map.set(key, { data, refCount: 1 });
  }

  public retain(key: string): T | undefined {
    const item = this.map.get(key);
    if (item) {
      item.refCount++;
      return item.data;
    }
    return undefined;
  }

  public release(key: string): void {
    const item = this.map.get(key);
    if (item) {
      item.refCount--;

      if (item.refCount <= 0) {
        if (this.onZeroRefs) {
          this.onZeroRefs(key, item.data);
        }
        this.map.delete(key);
      }
    }
  }

  public clear(): void {
    if (this.onZeroRefs) {
      for (const [key, item] of this.map.entries()) {
        this.onZeroRefs(key, item.data);
      }
    }
    this.map.clear();
  }
}
