import _get from 'lodash/get';
import google from 'googleapis';
import moment from 'moment';

const sheets = google.sheets('v4');

class GoogleService {

  constructor(serviceAccountEmail, serviceAccountPrivateKey) {
    this.jwtClient = new google.auth.JWT(
      serviceAccountEmail,
      null,
      serviceAccountPrivateKey,
      ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      null,
    );
    this.firstRow = 3;  // FIXME: magic number
    this.maxEntriesAmount = 50;  // FIXME: magic number
  }

  fetchSheet(spreadsheetId, callback) {
    const request = {
      spreadsheetId,
      ranges: [
        `'numbers'!B${this.firstRow}:B${this.maxEntriesAmount}`,
        `'numbers'!C${this.firstRow}:C${this.maxEntriesAmount}`,
        `'numbers'!D${this.firstRow}:D${this.maxEntriesAmount}`,
        `'numbers'!E${this.firstRow}:E${this.maxEntriesAmount}`],
      includeGridData: true,
      auth: this.jwtClient,
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
          const googleTimestamp = timestamp.numberValue;
          const date = moment(new Date(1899, 12, 30)).add(googleTimestamp, 'd').format('MMM, D'); // conversion from a Google's timestamp format
          const openBugs = columns[1][i] === undefined ? 0 : columns[1][i].numberValue;
          const solvedBugs = columns[2][i] === undefined ? 0 : columns[2][i].numberValue;
          const newBugs = columns[3][i] === undefined ? 0 : columns[3][i].numberValue;
          return { date, openBugs, solvedBugs, newBugs };
        });
        // TODO: Move building of API response to the "route"
        callback(err, history);
      } catch (exception) {
        callback(exception);
      }
    });
  }
}

export default GoogleService;
