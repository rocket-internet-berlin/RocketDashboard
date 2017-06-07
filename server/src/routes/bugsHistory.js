import express from 'express';
import _ from 'lodash';
import google from 'googleapis';
import { spreadsheetID, clientAccountEmail, clientAccountPrivateKey } from '../config/config';

const sheets = google.sheets('v4');
const router = express.Router();

const jwtClient = new google.auth.JWT(
  clientAccountEmail(),
  null,
  clientAccountPrivateKey(),
  ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  null,
);

const maxEntriesAmount = 20;  // FIXME: magic number

router.get('/', (req, res) => {
  const request = {
    spreadsheetId: spreadsheetID(),
    ranges: [`A1:A${maxEntriesAmount}`, `B1:B${maxEntriesAmount}`, `C1:C${maxEntriesAmount}`],
    includeGridData: true,
    auth: jwtClient,
    fields: 'sheets(data(rowData(values(userEnteredValue))))',
  };
  sheets.spreadsheets.get(request, (err, response) => {
    if (err) {
      res.status(500).send('Sorry, something went wrong');
      return;
    }
    try {
      const data = _.get(response, 'sheets[0].data');
      const columns = data.map((column) => column.rowData.map(cellData => _.get(cellData, 'values[0].userEnteredValue')));
      const history = columns[0].map((label, i) => (
        { label: label.stringValue, bugs: columns[1][i].numberValue }
      ));
      const period = columns[2][0].stringValue;
      res.json({
        status: 'success',
        message: '',
        data: {
          period,
          history,
        },
      });
    } catch (exception) {
      res.status(500).send('Sorry, something went wrong');
    }
  });
});

export default router;
