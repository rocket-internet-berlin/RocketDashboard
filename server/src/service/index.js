import CacheService from './cacheService';
import GoogleService from './googleService';
import JiraService from './jiraService';
import NewRelicService from './newRelicService';
import TriviaService from './triviaService';
import config from '../config';

const cacheService = new CacheService(config.defaultCacheTTL);
const googleService = new GoogleService(config.google.serviceAccountEmail, config.google.serviceAccountPrivateKey);
const jiraService = new JiraService(config.jira);
const newRelicService = new NewRelicService(config.newRelic);
const triviaService = new TriviaService();

export {
  cacheService,
  googleService,
  jiraService,
  newRelicService,
  triviaService,
};
