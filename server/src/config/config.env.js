require('dotenv').config({ silent: true });

module.exports = {
  bugsHistory: {
    spreadsheetId: process.env.BUGS_HISTORY_SPREADSHEET_ID,
    serviceAccountEmail: process.env.BUGS_HISTORY_SERVICE_ACCOUNT_EMAIL,
    serviceAccountPrivateKey: process.env.BUGS_HISTORY_SERVICE_ACCOUNT_PRIVATE_KEY,
  },
  newRelic: {
    accountId: process.env.NEWRELIC_ACCOUNT_ID,
    queryKey: process.env.NEWRELIC_QUERY_KEY,
  },
};
