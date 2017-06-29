import CacheService from './cacheService';
import GoogleService from './googleService';
import JiraService from './jiraService';
import config from '../config';

const cacheService = new CacheService(config.defaultCacheTTL);
const googleService = new GoogleService(config.google.serviceAccountEmail, config.google.serviceAccountPrivateKey);
const jiraService = new JiraService(config.jira.host, config.jira.username, config.jira.password);

export {
  cacheService,
  googleService,
  jiraService,
};
