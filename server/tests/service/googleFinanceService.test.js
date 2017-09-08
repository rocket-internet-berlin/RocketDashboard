/* eslint-disable prefer-arrow-callback,func-names,no-unused-vars */
import forEach from 'lodash/forEach';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import GoogleFinanceService from '../../src/service/googleFinanceService';
import constants from '../../src/config/constants';

describe('GoogleFinanceService', () => {
  const testCompany = 'testCompany';
  const validConfig = { stockTicker: 'testStock', company: testCompany };

  describe('#constructor - Config schema validation', () => {
    it('Should not throw any error when passed a valid config', () => {
      expect(() => {
        const googleFinanceService = new GoogleFinanceService(validConfig);
      }).not.toThrow();
    });

    it('Should throw error when passed an invalid config', () => {
      const incompleteConfig = { company: 'testCompany' }; // stockTicker key not present, should throw error

      expect(() => {
        const googleFinanceService = new GoogleFinanceService(incompleteConfig);
      }).toThrow();
    });
  });

  describe('#fetchStockPrice()', () => {
    let axiosMock = null;
    let googleFinanceService = null;

    beforeEach(() => {
      axiosMock = new MockAdapter(axios);
      googleFinanceService = new GoogleFinanceService(validConfig);
    });

    it('Returns correct data when Google returns valid stock data', () => {
      axiosMock.onGet(googleFinanceService.buildStockPriceFetchUrl()).reply(200,
        '// [ { "id": "343738966354611" ,"t" : "RKET" ,"e" : "FRA" ,"l" : "19.21" ,"l_fix" : "19.21" ,"l_cur" : "€19.21" ,"s": "0" ,"ltt":"8:03AM GMT+2" ,"lt" : "Sep 1, 8:03AM GMT+2" ,"lt_dts" : "2017-09-01T08:03:11Z" ,"c" : "-0.17" ,"c_fix" : "-0.17" ,"cp" : "-0.87" ,"cp_fix" : "-0.87" ,"ccol" : "chr" ,"pcls_fix" : "19.367" } ]',
      );

      return googleFinanceService.fetchStockPrice().then(function (result) {
        const expectedResult = {
          current: 19.21,
          change: -0.17,
          previous: 19.38,
          heading: testCompany,
        };

        forEach(expectedResult, function (value, key) {
          expect(key in result).toBe(true);

          if (typeof value === 'number') {
            expect(result[key]).toBeCloseTo(value);
          } else {
            expect(result[key]).toBe(value);
          }
        });

        // Don't know what the updated timestamp value will be. Can just check if it exists and is valid date.
        expect('updated' in result).toBe(true);
        expect(new Date(result.updated)).not.toBe(constants.testing.invalidDateString);
      });
    });

    it('Returns empty object when Google does not return valid JSON', () => {
      axiosMock.onGet(googleFinanceService.buildStockPriceFetchUrl()).reply(200,
        'invalid response',
      );

      return googleFinanceService.fetchStockPrice().then(function (result) {
        expect(result).toEqual({});
      });
    });

    it('Returns empty object when Google returns valid JSON but without the stock price', () => {
      axiosMock.onGet(googleFinanceService.buildStockPriceFetchUrl()).reply(200,
        '// [ { "id": "343738966354611" ,"t" : "RKET" ,"e" : "FRA" ,"l" : "19.21", "c_fix" : "-0.17" } ]',
      );

      return googleFinanceService.fetchStockPrice().then(function (result) {
        expect(result).toEqual({});
      });
    });

    it('Returns empty object when Google returns valid JSON but without the last change in stock price', () => {
      axiosMock.onGet(googleFinanceService.buildStockPriceFetchUrl()).reply(200,
        '// [ { "id": "343738966354611" ,"t" : "RKET" ,"e" : "FRA" ,"l" : "19.21", "l_fix" : "-0.17" } ]',
      );

      return googleFinanceService.fetchStockPrice().then(function (result) {
        expect(result).toEqual({});
      });
    });
  });
});
