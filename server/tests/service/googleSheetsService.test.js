/* eslint-disable no-unused-vars */
import sinon from 'sinon';

import GoogleSheetsService from '../../src/service/googleSheetsService';
import constants from '../../src/config/constants';

describe('GoogleSheetsService', () => {
  const validConfig = { serviceAccountEmail: 'someAccount', serviceAccountPrivateKey: 'someKey' };
  const testSheetId = 1;
  const testDataRange = "'some_sheet'!B1:E50";

  describe('#constructor - Config schema validation', () => {
    it('Should not throw any error when passed a valid config', () => {
      expect(() => {
        const googleSheetsService = new GoogleSheetsService(validConfig);
      }).not.toThrow();
    });

    it('Should throw error when passed an invalid config', () => {
      const incompleteConfig = { serviceAccountEmail: 'someAccount' }; // serviceAccountPrivateKey key not present, should throw error

      expect(() => {
        const googleSheetsService = new GoogleSheetsService(incompleteConfig);
      }).toThrow();
    });
  });

  describe('#fetchSheet()', () => {
    it('Returns correct data when Google returns valid sheet data', () => {
      const googleSheetsService = new GoogleSheetsService(validConfig);
      const response = {
        values: [
          ['2017-01-01', '2017-01-02', '2017-01-03', '2017-01-04'],
          [4, 5, 6, ''],
          [7, 8, 9, ''],
          [10, 11, 12, ''],
        ],
      };
      const expectedHistory = [
         { date: '2017-01-01', openBugs: 4, solvedBugs: 7, newBugs: 10 },
         { date: '2017-01-02', openBugs: 5, solvedBugs: 8, newBugs: 11 },
         { date: '2017-01-03', openBugs: 6, solvedBugs: 9, newBugs: 12 },
         { date: '2017-01-04', openBugs: 0, solvedBugs: 0, newBugs: 0 }, // Empty cells should get value 0
      ];
      const expectedError = '';

      // Don't need this to be anything real - it's just passed into the black box of Google Sheets
      googleSheetsService.jwtClient = {};

      // Need to stub the get function to fetch the sheet data though
      sinon.stub(googleSheetsService.sheets.spreadsheets.values, 'get');

      // Stub for the callback run by the get function's own callback depending on results
      const callbackStub = sinon.spy();

      // Running the thing
      googleSheetsService.fetchSheet(testSheetId, testDataRange, callbackStub);
      expect(googleSheetsService.sheets.spreadsheets.values.get.calledOnce).toBe(true);

      // Fetching what the Google Sheets get function stub was called with so we can get its anonymous callback to run
      const anonymousCallback = googleSheetsService.sheets.spreadsheets.values.get.getCalls()[0].args[1];

      // Run the callback with a fake response from Google Sheets, empty error
      anonymousCallback(expectedError, response);

      expect(callbackStub.calledOnce).toBe(true); // Should have only been run once in the anonymous callback
      expect(callbackStub.getCalls()[0].args.length).toBe(2); // Check if called with 'err' AND 'response' inside anonymous callback

      // Check 'err' param in callbackStub was empty
      const errParam = callbackStub.getCalls()[0].args[0];
      expect(errParam).toBe(expectedError);

      const processedResult = callbackStub.getCalls()[0].args[1];
      expect('history' in processedResult).toBe(true);
      expect('updated' in processedResult).toBe(true);
      expect(processedResult.history).toEqual(expectedHistory);
      expect(new Date(processedResult.updated)).not.toBe(constants.testing.invalidDateString); // Check valid date
    });

    it('Returns no data when Google returns an error', () => {
      const googleSheetsService = new GoogleSheetsService(validConfig);
      const expectedError = 'ERROR';

      // Don't need this to be anything real - it's just passed into the black box of Google Sheets
      googleSheetsService.jwtClient = {};

      // Need to stub the get function to fetch the sheet data though
      sinon.stub(googleSheetsService.sheets.spreadsheets.values, 'get');

      // Stub for the callback run by the get function's own callback depending on results
      const callbackStub = sinon.spy();

      // Running the thing
      googleSheetsService.fetchSheet(testSheetId, testDataRange, callbackStub);
      expect(googleSheetsService.sheets.spreadsheets.values.get.calledOnce).toBe(true);

      // Fetching what the Google Sheets get function stub was called with so we can get its anonymous callback to run
      const anonymousCallback = googleSheetsService.sheets.spreadsheets.values.get.getCalls()[0].args[1];

      // Run the callback with a fake response from Google Sheets containing some error message
      anonymousCallback(expectedError, {});

      expect(callbackStub.calledOnce).toBe(true); // Should have only been run once in the anonymous callback
      expect(callbackStub.getCalls()[0].args.length).toBe(1); // Check if called with 'err' param ONLY

      // Check 'err' param in callbackStub was the expected error from above
      const errParam = callbackStub.getCalls()[0].args[0];
      expect(errParam).toBe(expectedError);
    });

    it('Returns no data when Google returns no error but malformed data', () => {
      const googleSheetsService = new GoogleSheetsService(validConfig);
      const brokenResponse = { // Only three rows, should be four
        values: [
          ['2017-01-01', '2017-01-02', '2017-01-03'],
          [7, 8, 9],
          [10, 11, 12],
        ],
      };

      // Don't need this to be anything real - it's just passed into the black box of Google Sheets
      googleSheetsService.jwtClient = {};

      // Need to stub the get function to fetch the sheet data though
      sinon.stub(googleSheetsService.sheets.spreadsheets.values, 'get');

      // Stub for the callback run by the get function's own callback depending on results
      const callbackStub = sinon.spy();

      // Running the thing
      googleSheetsService.fetchSheet(testSheetId, testDataRange, callbackStub);
      expect(googleSheetsService.sheets.spreadsheets.values.get.calledOnce).toBe(true);

      // Fetching what the Google Sheets get function stub was called with so we can get its anonymous callback to run
      const anonymousCallback = googleSheetsService.sheets.spreadsheets.values.get.getCalls()[0].args[1];

      // Run the callback with a fake response from Google Sheets, empty error
      anonymousCallback('', brokenResponse);

      expect(callbackStub.calledOnce).toBe(true); // Should have only been run once in the anonymous callback
      expect(callbackStub.getCalls()[0].args.length).toBe(1); // Check if called with 'err' param ONLY

      // Check 'err' param in callbackStub was not empty
      const caughtException = callbackStub.getCalls()[0].args[0];
      expect(caughtException instanceof TypeError).toBe(true);
      expect(caughtException.toString()).toContain('TypeError: Cannot read property \'0\' of undefined');
    });
  });
});
