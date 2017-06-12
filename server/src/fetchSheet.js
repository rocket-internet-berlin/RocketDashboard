import _ from 'lodash';
import google from 'googleapis';
import Ajv from 'ajv';
import config from './config/config';

// validate required config props
const ajv = new Ajv({
  allErrors: true,
});
const schema = {
  'required': [
    'spreadsheetId',
    'clientAccountEmail',
    'clientAccountPrivateKey',
  ],
};

const validate = ajv.compile(schema);
if (!validate(config.bugsDiff)) {
  throw ajv.errorsText(validate.errors);
}

const sheets = google.sheets('v4');

const jwtClient = new google.auth.JWT(
  config.bugsDiff.clientAccountEmail,
  null,
  config.bugsDiff.clientAccountPrivateKey,
  ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  null,
);

const maxEntriesAmount = 20;  // FIXME: magic number

const fetchSheet = (callback) => {
  const request = {
    spreadsheetId: config.bugsDiff.spreadsheetId,
    ranges: [`A1:A${maxEntriesAmount}`, `B1:B${maxEntriesAmount}`, `C1:C${maxEntriesAmount}`],
    includeGridData: true,
    auth: jwtClient,
    fields: 'sheets(data(rowData(values(userEnteredValue))))',
  };
  sheets.spreadsheets.get(request, (err, response) => {
    if (err) {
      callback(false);
      return;
    }
    try {
      // @TODO Decouple "fetching" and "data crunching" so we can reuse them
      const data = _.get(response, 'sheets[0].data');
      const columns = data.map((column) => column.rowData.map(cellData => _.get(cellData, 'values[0].userEnteredValue')));
      const history = columns[0].map((label, i) => (
        { label: label.stringValue, bugs: columns[1][i].numberValue }
      ));
      const period = columns[2][0].stringValue;
      callback(true, {
        status: 'success',
        message: '',
        data: {
          period,
          history,
        },
      });
    } catch (exception) {
      callback(false);
    }
  });
};

export default fetchSheet;
