interface CachedItem<T> {
  data: T;
  timestamp: number;
}

export default class CachedApi {
  private baseUrl: string;
  private cache: Map<string, CachedItem<unknown>>;

  private maxSize: number;
  private ttl: number;

  constructor(baseUrl: string, options?: { maxSize?: number; ttl?: number }) {
    this.baseUrl = baseUrl;
    this.cache = new Map();
    this.maxSize = options?.maxSize ?? 10;
    this.ttl = options?.ttl ?? 5 * 60 * 1000;
  }

  protected async getCached<T>(endpoint: string): Promise<T> {
    const now = Date.now();

    const cached = this.cache.get(endpoint);

    if (cached && now - cached.timestamp < this.ttl) {
      return cached.data as T;
    }

    const url = `${this.baseUrl}${endpoint}`;
    const res = await fetch(url, { method: "get" });
    if (!res.ok) {
      throw new Error(`[ERROR]: ${res.statusText}`);
    }
    const resJson: T = await res.json();

    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.getOldestCacheKeys();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(endpoint, { data: { ...resJson }, timestamp: now });

    return resJson;
  }

  private getOldestCacheKeys(): string | null {
    let oldestKey: string | null = null;
    let oldestTimestamp = Infinity;

    for (const [key, item] of this.cache) {
      if (item.timestamp < oldestTimestamp) {
        oldestTimestamp = item.timestamp;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  protected async get<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const res = await fetch(url, { method: "get" });
    if (!res.ok) {
      throw new Error(`[ERROR]: ${res.statusText}`);
    }

    return await res.json();
  }
}
