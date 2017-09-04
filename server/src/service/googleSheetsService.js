import google from 'googleapis';
import validateSchema from '../helper/validator';

class GoogleSheetsService {

  static validateConfig(config) {
    const schema = {
      required: [
        'serviceAccountEmail',
        'serviceAccountPrivateKey',
      ],
    };
    if (!validateSchema(schema, config)) {
      throw new Error('Invalid configuration properties');
    }
  }

  constructor(config) {
    GoogleSheetsService.validateConfig(config);

    this.sheets = google.sheets('v4');

    this.jwtClient = new google.auth.JWT(
      config.serviceAccountEmail,
      null,
      config.serviceAccountPrivateKey,
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
    this.sheets.spreadsheets.values.get(request, (err, response) => {
      if (err) {
        callback(err, { status: 'error', history: [], error: 'An error occurred!' });
        return;
      }
      try {
        const history = GoogleSheetsService.parseResponse(response);
        const updated = new Date();
        callback(err, { history, updated });
      } catch (exception) {
        callback(exception);
      }
    });
  }

  static parseResponse(response) {
    const columns = response.values;
    return columns[0].map((date, i) => {
      const openBugs = Number(columns[1][i] || 0);
      const solvedBugs = Number(columns[2][i] || 0);
      const newBugs = Number(columns[3][i] || 0);
      return { date, openBugs, solvedBugs, newBugs };
    });
  }
}

export default GoogleSheetsService;
