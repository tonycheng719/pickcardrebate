// Redis 快取配置
// 使用前需要：npm install ioredis

// 使用 Upstash Redis（免費方案）或其他 Redis 服務
// 設定環境變數：REDIS_URL

// 由於這是可選功能，我們先使用內存快取作為 fallback

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

// 簡單的內存快取（開發用途/沒有 Redis 時的 fallback）
const memoryCache = new Map<string, CacheEntry<any>>();

// 快取配置
export const cacheConfig = {
  // 預設過期時間（秒）
  defaultTTL: 60 * 5, // 5 分鐘
  
  // 各種資料的 TTL
  ttl: {
    cards: 60 * 60, // 1 小時
    merchants: 60 * 60, // 1 小時
    cardRatings: 60 * 5, // 5 分鐘
    searchResults: 60 * 10, // 10 分鐘
    userProfile: 60 * 5, // 5 分鐘
  },
  
  // 快取鍵前綴
  prefix: 'pcr:',
};

// 快取鍵生成
export function getCacheKey(type: string, id?: string): string {
  return `${cacheConfig.prefix}${type}${id ? `:${id}` : ''}`;
}

// 獲取快取
export async function getCache<T>(key: string): Promise<T | null> {
  const fullKey = getCacheKey(key);
  
  // 檢查內存快取
  const entry = memoryCache.get(fullKey);
  if (entry) {
    if (Date.now() < entry.expiresAt) {
      return entry.value as T;
    }
    // 過期了，刪除
    memoryCache.delete(fullKey);
  }
  
  // TODO: 如果有 Redis，在這裡查詢
  // const redis = getRedisClient();
  // const data = await redis.get(fullKey);
  // if (data) return JSON.parse(data);
  
  return null;
}

// 設置快取
export async function setCache<T>(
  key: string, 
  value: T, 
  ttlSeconds: number = cacheConfig.defaultTTL
): Promise<void> {
  const fullKey = getCacheKey(key);
  
  // 設置內存快取
  memoryCache.set(fullKey, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
  
  // TODO: 如果有 Redis，在這裡設置
  // const redis = getRedisClient();
  // await redis.setex(fullKey, ttlSeconds, JSON.stringify(value));
}

// 刪除快取
export async function deleteCache(key: string): Promise<void> {
  const fullKey = getCacheKey(key);
  memoryCache.delete(fullKey);
  
  // TODO: 如果有 Redis
  // const redis = getRedisClient();
  // await redis.del(fullKey);
}

// 清除所有快取（按前綴）
export async function clearCache(pattern?: string): Promise<void> {
  if (pattern) {
    const prefix = getCacheKey(pattern);
    for (const key of memoryCache.keys()) {
      if (key.startsWith(prefix)) {
        memoryCache.delete(key);
      }
    }
  } else {
    memoryCache.clear();
  }
  
  // TODO: 如果有 Redis
  // const redis = getRedisClient();
  // const keys = await redis.keys(`${cacheConfig.prefix}${pattern || ''}*`);
  // if (keys.length > 0) await redis.del(...keys);
}

// 快取裝飾器函數
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds?: number
): Promise<T> {
  // 嘗試從快取獲取
  const cached = await getCache<T>(key);
  if (cached !== null) {
    return cached;
  }
  
  // 獲取新數據
  const data = await fetcher();
  
  // 儲存到快取
  await setCache(key, data, ttlSeconds);
  
  return data;
}

// Redis 客戶端（需要 npm install ioredis）
// let redisClient: Redis | null = null;

// export function getRedisClient(): Redis {
//   if (!redisClient) {
//     const redisUrl = process.env.REDIS_URL;
//     if (!redisUrl) {
//       throw new Error('REDIS_URL not configured');
//     }
//     redisClient = new Redis(redisUrl);
//   }
//   return redisClient;
// }

