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
  }

  fetchSheet(spreadsheetId, dataRange, callback) {
    const request = {
      spreadsheetId,
      ranges: [dataRange],
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
        const history = this.parseResponse(response);
        callback(err, history);
      } catch (exception) {
        callback(exception);
      }
    });
  }

  parseReponse(response) {
    const data = _get(response, 'sheets[0].data');
    const columns = data.map((column) => column.rowData.map(cellData => _get(cellData, 'values[0].userEnteredValue')));
    return columns[0].map((timestamp, i) => {
      const googleTimestamp = timestamp.numberValue;
      const date = moment(new Date(1899, 12, 30)).add(googleTimestamp, 'd').format('MMM, D'); // conversion from a Google's timestamp format
      const openBugs = columns[1][i] === undefined ? 0 : columns[1][i].numberValue;
      const solvedBugs = columns[2][i] === undefined ? 0 : columns[2][i].numberValue;
      const newBugs = columns[3][i] === undefined ? 0 : columns[3][i].numberValue;
      return { date, openBugs, solvedBugs, newBugs };
    });
  }
}

export default GoogleService;
