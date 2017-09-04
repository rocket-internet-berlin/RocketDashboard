require('dotenv').config({ silent: true });

module.exports = {
  bugsHistory: {
    spreadsheetId: process.env.BUGS_HISTORY_SPREADSHEET_ID,
    dataRange: process.env.BUGS_HISTORY_DATA_RANGE,
  },
  google: {
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    serviceAccountPrivateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  },
  newRelic: {
    accountId: process.env.NEWRELIC_ACCOUNT_ID,
    queryKey: process.env.NEWRELIC_QUERY_KEY,
  },
  jira: {
    host: process.env.JIRA_HOST,
    username: process.env.JIRA_USERNAME,
    password: process.env.JIRA_PASSWORD,
  },
  finance: {
    stockTicker: process.env.STOCK_TICKER,
    company: process.env.COMPANY_NAME,
  },
  weather: {
    apiKey: process.env.WEATHER_API_KEY,
    apiCityId: process.env.WEATHER_API_CITY_ID,
  },
  statusCake: {
    apiKey: process.env.STATUSCAKE_API_KEY,
    username: process.env.STATUSCAKE_USERNAME,
    testId: process.env.STATUSCAKE_TEST_ID,
    period: process.env.STATUSCAKE_HISTORY_PERIOD,
    interval: process.env.STATUSCAKE_HISTORY_INTERVAL,
  },
  twitter: {
    query: process.env.TWITTER_QUERY,
  },
  github: {
    user: process.env.GITHUB_USER,
    project: process.env.GITHUB_PROJECT,
    authToken: process.env.GITHUB_AUTH_TOKEN,
  },
};
