import CacheService from './cacheService';
import GoogleSheetsService from './googleSheetsService';
import JiraService from './jiraService';
import NewRelicService from './newRelicService';
import TriviaService from './triviaService';
import GoogleFinanceService from './googleFinanceService';
import WeatherService from './weatherService';
import config from '../config';

const googleSheetsService = new GoogleSheetsService(config.google.serviceAccountEmail, config.google.serviceAccountPrivateKey);
const cacheService = new CacheService(config.cache);
const jiraService = new JiraService(config.jira);
const newRelicService = new NewRelicService(config.newRelic);
const triviaService = new TriviaService();
const googleFinanceService = new GoogleFinanceService(config.finance);
const weatherService = new WeatherService(config.weather);

export {
  cacheService,
  googleSheetsService,
  jiraService,
  newRelicService,
  triviaService,
  googleFinanceService,
  weatherService,
};
