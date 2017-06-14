import _get from 'lodash/get';
import google from 'googleapis';
import Ajv from 'ajv';
import config from './config/config';

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

const maxEntriesAmount = 20;  // FIXME: magic number

const fetchSheet = (callback) => {
  const request = {
    spreadsheetId: config.bugsHistory.spreadsheetId,
    ranges: [`A1:A${maxEntriesAmount}`, `B1:B${maxEntriesAmount}`, `C1:C${maxEntriesAmount}`],
    includeGridData: true,
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
      const history = columns[0].map((label, i) => (
        { label: label.stringValue, bugs: columns[1][i].numberValue }
      ));
      const period = columns[2][0].stringValue;
      // TODO: Move building of API response to the "route"
      callback(err, {
        status: 'success',
        message: '',
        data: {
          period,
          history,
        },
      });
    } catch (exception) {
      callback(exception);
    }
  });
};

export default fetchSheet;
