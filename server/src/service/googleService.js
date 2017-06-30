import google from 'googleapis';

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
      range: dataRange,
      majorDimension: 'COLUMNS',
      auth: this.jwtClient,
    };
    sheets.spreadsheets.values.get(request, (err, response) => {
      if (err) {
        callback(err);
        return;
      }
      try {
        const history = GoogleService.parseResponse(response);
        callback(err, history);
      } catch (exception) {
        callback(exception);
      }
    });
  }

  static parseResponse(response) {
    const columns = response.values;
    return columns[0].map((date, i) => {
      const openBugs = columns[1][i] === undefined ? 0 : Number(columns[1][i]);
      const solvedBugs = columns[2][i] === undefined ? 0 : Number(columns[2][i]);
      const newBugs = columns[3][i] === undefined ? 0 : Number(columns[3][i]);
      return { date, openBugs, solvedBugs, newBugs };
    });
  }
}

export default GoogleService;
