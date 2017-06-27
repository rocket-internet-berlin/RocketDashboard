import CacheService from './cacheService';
import config from '../config';

const cacheService = new CacheService(config.defaultCacheTTL);

export default {
  cacheService,
};
