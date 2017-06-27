import CacheService from './CacheService';
import config from '../config';

const cacheService = new CacheService(config.defaultCacheTTL);

export { cacheService }; // eslint-disable-line import/prefer-default-export
