import CacheService from './cacheService';
import NewRelicService from './newRelicService';
import config from '../config';

const cacheService = new CacheService(config.defaultCacheTTL);
const newRelicService = new NewRelicService(config.newRelic);

export {
  cacheService,
  newRelicService,
};
