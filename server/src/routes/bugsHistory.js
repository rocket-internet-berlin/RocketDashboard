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
    ranges: ['A1:A9', 'B1:B9'],
    includeGridData: true,
    auth: jwtClient,
    fields: 'sheets(data(rowData(values(userEnteredValue/numberValue))))',
  };
  sheets.spreadsheets.get(request, function(err, response) {
    if (err) {
      console.log('ERR123: ' + err);
      // TODO: handle an error
    } else {
      console.log('RESP123: ' + JSON.stringify(response, null, 2));
      // TODO: handle a response
    }
  });
  res.json({
    status: 'success',
    message: '',
    data: {
      period: 'Last 5 Days',
      history: [
        {
          label: 'Mon',
          bugs: 12,
        },
        {
          label: 'Tue',
          bugs: 8,
        },
        {
          label: 'Wed',
          bugs: 9,
        },
        {
          label: 'Thu',
          bugs: 10,
        },
        {
          label: 'Fri',
          bugs: 7,
        },
      ],
    },
  });
});

export default router;
