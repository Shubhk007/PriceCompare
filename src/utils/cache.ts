import { CacheEntry } from '../types';

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
const CACHE_KEY_PREFIX = 'price_compare_';

export function getCachedResults(url: string): CacheEntry | null {
  try {
    const cacheKey = CACHE_KEY_PREFIX + btoa(url);
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) return null;
    
    const entry: CacheEntry = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is still valid
    if (now - entry.timestamp < CACHE_DURATION) {
      return entry;
    } else {
      // Remove expired cache
      localStorage.removeItem(cacheKey);
      return null;
    }
  } catch {
    return null;
  }
}

export function setCachedResults(url: string, entry: Omit<CacheEntry, 'timestamp'>): void {
  try {
    const cacheKey = CACHE_KEY_PREFIX + btoa(url);
    const cacheEntry: CacheEntry = {
      ...entry,
      timestamp: Date.now()
    };
    
    localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
  } catch (error) {
    console.warn('Failed to cache results:', error);
  }
}

export function clearOldCache(): void {
  try {
    const now = Date.now();
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(CACHE_KEY_PREFIX)) {
        const cached = localStorage.getItem(key);
        if (cached) {
          try {
            const entry: CacheEntry = JSON.parse(cached);
            if (now - entry.timestamp >= CACHE_DURATION) {
              keysToRemove.push(key);
            }
          } catch {
            keysToRemove.push(key);
          }
        }
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.warn('Failed to clear old cache:', error);
  }
}
