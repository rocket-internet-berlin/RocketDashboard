import express from 'express';
import google from 'googleapis';

const sheets = google.sheets('v4');
const router = express.Router();

const jwtClient = new google.auth.JWT(
  '',   // TODO: client email
  null,
  '', // TODO: private key
  ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  null,
);

const maxEntriesAmount = 20;  // FIXME: magic number

router.get('/', (req, res) => {
  const request = {
    spreadsheetId: '',    // TODO: spreadsheet ID
    ranges: [`A1:A${maxEntriesAmount}`, `B1:B${maxEntriesAmount}`, `C1:C${maxEntriesAmount}`],
    includeGridData: true,
    auth: jwtClient,
    fields: 'sheets(data(rowData(values(userEnteredValue))))',
  };
  sheets.spreadsheets.get(request, (err, response) => {
    if (err) {
      console.log(`ERROR: ${err}`);
      return;
    }
    const data = response.sheets[0].data;
    const columns = data.map((column) => {
      const rowData = column.rowData;
      return rowData.map((cellData) => cellData.values[0].userEnteredValue);
    });
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
  });
});

export default router;
