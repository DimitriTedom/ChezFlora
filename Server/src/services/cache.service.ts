// Simple in-memory cache implementation (Redis can be added later)
interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: any, ttlSeconds?: number): Promise<void>;
  del(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
  flushPattern(pattern: string): Promise<void>;
}

// In-memory cache implementation
class MemoryCache implements CacheService {
  private cache = new Map<string, { value: any; expires: number }>();

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  async set(key: string, value: any, ttlSeconds: number = 3600): Promise<void> {
    const expires = Date.now() + (ttlSeconds * 1000);
    this.cache.set(key, { value, expires });
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async exists(key: string): Promise<boolean> {
    const item = this.cache.get(key);
    if (!item) return false;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  async flushPattern(pattern: string): Promise<void> {
    const regex = new RegExp(pattern.replace('*', '.*'));
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }
}

export const cache = new MemoryCache();

// Cache key generators
export const CacheKeys = {
  user: (id: string) => `user:${id}`,
  userByEmail: (email: string) => `user:email:${email}`,
  product: (id: string) => `product:${id}`,
  products: (category?: string, page?: number) => 
    `products:${category || 'all'}:page:${page || 1}`,
  cart: (userId: string) => `cart:${userId}`,
  orders: (userId: string, page?: number) => 
    `orders:${userId}:page:${page || 1}`,
  adminStats: () => 'admin:stats',
  reviews: (productId: string) => `reviews:${productId}`,
};

// Cache decorators for common operations
export const withCache = <T>(
  cacheKey: string,
  fetchFn: () => Promise<T>,
  ttlSeconds: number = 3600
) => {
  return async (): Promise<T> => {
    // Try to get from cache first
    const cached = await cache.get<T>(cacheKey);
    if (cached !== null) {
      return cached;
    }

    // Fetch fresh data
    const data = await fetchFn();
    
    // Cache the result
    await cache.set(cacheKey, data, ttlSeconds);
    
    return data;
  };
};

// Cache invalidation helpers
export const invalidateUserCache = async (userId: string) => {
  await Promise.all([
    cache.del(CacheKeys.user(userId)),
    cache.del(CacheKeys.cart(userId)),
    cache.flushPattern(`orders:${userId}:*`),
  ]);
};

export const invalidateProductCache = async (productId?: string) => {
  if (productId) {
    await cache.del(CacheKeys.product(productId));
    await cache.del(CacheKeys.reviews(productId));
  }
  await cache.flushPattern('products:*');
};

export const invalidateAdminCache = async () => {
  await cache.del(CacheKeys.adminStats());
  await cache.flushPattern('admin:*');
};