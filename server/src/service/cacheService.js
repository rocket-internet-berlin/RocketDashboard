import Cache from 'node-cache';

class CacheService {
  constructor(stdTTL) {
    this.cache = new Cache({ stdTTL });
  }

  get(key) {
    return this.cache.get(key);
  }
  set(key, value) {
    return this.cache.set(key, value);
  }
}

export default CacheService;
