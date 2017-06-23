import _get from 'lodash/get';
import google from 'googleapis';
import Ajv from 'ajv';
import config from './config';

// validate required config props
const ajv = new Ajv({
  allErrors: true,
});

const validate = ajv.compile({
  required: [
    'spreadsheetId',
    'serviceAccountEmail',
    'serviceAccountPrivateKey',
  ],
});
if (!validate(config.bugsHistory)) {
  throw ajv.errorsText(validate.errors);
}

const sheets = google.sheets('v4');

const jwtClient = new google.auth.JWT(
  config.bugsHistory.serviceAccountEmail,
  null,
  config.bugsHistory.serviceAccountPrivateKey,
  ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  null,
);

const firstRow = 3;  // FIXME: magic number
const maxEntriesAmount = 50;  // FIXME: magic number

const fetchSheet = (callback) => {
  const request = {
    spreadsheetId: config.bugsHistory.spreadsheetId,
    ranges: [
      `'numbers'!B${firstRow}:B${maxEntriesAmount}`,
      `'numbers'!C${firstRow}:C${maxEntriesAmount}`,
      `'numbers'!D${firstRow}:D${maxEntriesAmount}`,
      `'numbers'!E${firstRow}:E${maxEntriesAmount}`],
    includeGridData: true,
    dateTimeRenderOption: 'SERIAL_NUMBER',
    auth: jwtClient,
    fields: 'sheets(data(rowData(values(userEnteredValue))))',
  };
  sheets.spreadsheets.get(request, (err, response) => {
    if (err) {
      callback(err);
      return;
    }
    try {
      // TODO: Decouple "fetching" and "data crunching" so we can reuse them
      const data = _get(response, 'sheets[0].data');
      const columns = data.map((column) => column.rowData.map(cellData => _get(cellData, 'values[0].userEnteredValue')));
      const history = columns[0].map((timestamp, i) => {
        const timestampValue = timestamp.numberValue;
        const openBugs = columns[1][i] === undefined ? 0 : columns[1][i].numberValue;
        const solvedBugs = columns[2][i] === undefined ? 0 : columns[2][i].numberValue;
        const newBugs = columns[3][i] === undefined ? 0 : columns[3][i].numberValue;
        return { timestamp: timestampValue, openBugs, solvedBugs, newBugs };
      });
      // TODO: Move building of API response to the "route"
      callback(err, {
        status: 'success',
        message: '',
        data: [...history],
      });
    } catch (exception) {
      console.log(`exception123: ${exception}`);
      callback(exception);
    }
  });
};

export default fetchSheet;
