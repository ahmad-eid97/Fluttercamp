export const locale_cache = new Map();

export function addToCache({ id, data, ttl = 60, filters }: AddToCacheParams) {
  const TTL = ttl * 1000;
  localStorage.setItem(`fluttercamp.cache.${id}`, JSON.stringify({ data, filters, expiry: new Date().getTime() + TTL }));
}

export function getFromCache<R>(id: string, filters?: { [key: string]: string | number }) {
  const stringifiedCachedData = localStorage.getItem(`fluttercamp.cache.${id}`);
  if (!stringifiedCachedData) return null;

  const cachedData = JSON.parse(stringifiedCachedData);
  if (new Date().getTime() > cachedData.expiry) {
    removeCache(`fluttercamp.cache.${id}`);
    return null;
  }

  if (JSON.stringify(filters) !== JSON.stringify(cachedData.filters)) return null;

  return cachedData.data as R;
}

export function removeCache(id: string) {
  localStorage.removeItem(`fluttercamp.cache.${id}`);
}

export function clearCache(id: string) {
  localStorage.clear();
}

type AddToCacheParams = {
  id: string;
  filters: { [key: string]: string | number } | undefined;
  data: any;
  ttl?: number; //= In Seconds
}