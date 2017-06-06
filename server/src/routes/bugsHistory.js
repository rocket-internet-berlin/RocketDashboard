import express from 'express';

const router = express.Router();

const google = require('googleapis');
const sheets = google.sheets('v4');

const jwtClient = new google.auth.JWT(
  '',   // TODO: client email
  null,
  '', // TODO: private key
  ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  null
);

router.get('/', (req, res, next) => {
  const request = {
    spreadsheetId: '',    // TODO: spreadsheet ID
    ranges: ['A1:A20', 'B1:B20'],   // TODO: magic number
    includeGridData: true,
    auth: jwtClient,
    fields: 'sheets(data(rowData(values(userEnteredValue/numberValue))))',
  };
  sheets.spreadsheets.get(request, (err, response) => {
    if (err) {
      console.log(`ERR123: ${err}`);
      return;
    }
    const data = response.sheets[0].data;
    const columns = data.map((column) => {
      const rowData = column.rowData;
      const values = rowData[0].values;
      return rowData.map((cellData) => cellData.values[0].userEnteredValue.numberValue);
    });
    const history = columns[0].map((label, i) => (
      { label, bugs: columns[1][i] }
    ));
    res.json({
      status: 'success',
      message: '',
      data: {
        period: 'Last ? Days',
        history,
      },
    });
  });
});

export default router;
