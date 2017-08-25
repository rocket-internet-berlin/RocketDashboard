import redis from 'redis';

class CacheService {
  constructor(cacheConfig) {
    console.log('Starting redis cache service.');
    this.client = redis.createClient(
      {
        host: cacheConfig.redisHost,
        redisPort: cacheConfig.redisPort,
        db: cacheConfig.redisDatabaseNumber,
      },
    );
    this.stdTTL = cacheConfig.defaultCacheTTL;
  }
  get(key, callback) {
    // Do standard callback like (err, result) => { callback function }
    // The result var will be null if nothing found for that key.
    return this.client.get(key, callback);
  }
  set(key, value, ttl = null) {
    const ttlToUse = ttl !== null ? ttl : this.stdTTL;
    return this.client.set(key, JSON.stringify(value), 'EX', ttlToUse);
  }
  exists(key, callback) {
    return this.client.exists(key, callback);
  }
  keys(callback) {
    return this.client.keys('*', callback);
  }
  clear() {
    return this.client.flushdb();
  }
}

export default CacheService;
