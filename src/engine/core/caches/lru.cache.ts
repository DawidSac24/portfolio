export class LRUCache<T> {
  private limit: number;
  private map: Map<string, T> = new Map();

  private onEvict?: (key: string, item: T) => void;

  constructor(limit: number, onEvict?: (key: string, item: T) => void) {
    this.limit = limit;
    this.onEvict = onEvict;
  }

  public has(key: string): boolean {
    return this.map.has(key);
  }

  public get(key: string): T | undefined {
    if (!this.map.has(key)) return undefined;

    // Refresh: Delete and re-insert to make it the "newest" item
    const item = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, item);

    return item;
  }

  public set(key: string, value: T): void {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.limit) {
      // Evict the oldest item
      const oldestKey = this.map.keys().next().value;
      if (oldestKey) {
        this.delete(oldestKey);
      }
    }
    this.map.set(key, value);
  }

  public delete(key: string): void {
    const item = this.map.get(key);
    if (item) {
      if (this.onEvict) this.onEvict(key, item);
      this.map.delete(key);
    }
  }

  public clear(): void {
    if (this.onEvict) {
      for (const [key, item] of this.map.entries()) {
        this.onEvict(key, item);
      }
    }
    this.map.clear();
  }
}
