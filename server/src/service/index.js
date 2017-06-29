import CacheService from './cacheService';
import GoogleService from './googleService';
import config from '../config';

const cacheService = new CacheService(config.defaultCacheTTL);
const googleService = new GoogleService(config.google.serviceAccountEmail, config.google.serviceAccountPrivateKey);

export default {
  cacheService,
  googleService,
};
