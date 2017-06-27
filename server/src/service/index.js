import CacheService from './cacheService';
import config from '../config';

export default {
  cacheService: new CacheService(config.defaultCacheTTL),
};
