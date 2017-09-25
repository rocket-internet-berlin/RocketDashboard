/* eslint-disable prefer-arrow-callback,func-names,no-unused-vars */
import forEach from 'lodash/forEach';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import GoogleFinanceService from '../../src/service/googleFinanceService';
import constants from '../../src/config/constants';

describe('GoogleFinanceService', () => {
  const testCompany = 'testCompany';
  const validConfig = {stockTicker: 'testStock', company: testCompany};

  describe('#constructor - Config schema validation', () => {
    it('Should not throw any error when passed a valid config', () => {
      expect(() => {
        const googleFinanceService = new GoogleFinanceService(validConfig);
      }).not.toThrow();
    });

    it('Should throw error when passed an invalid config', () => {
      const incompleteConfig = {company: 'testCompany'}; // stockTicker key not present, should throw error

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
      axiosMock.onGet(googleFinanceService.buildStockPriceFetchUrl()).reply(200, `
        <div id="price-panel" class="id-price-panel goog-inline-block">
          <div>
            <span class="pr">
              <span id="ref_343738966354611_l">20.55</span>
            </span>
            <div class="id-price-change nwp goog-inline-block">
              <span class="ch bld"><span class="chr" id="ref_343738966354611_c">-0.08</span>
                <span class="chr" id="ref_343738966354611_cp">(-0.37%)</span>
              </span>
            </div>
          </div>
        </div>
      `);

      return googleFinanceService.fetchStockPrice().then(function (result) {
        const expectedResult = {
          current: 20.55,
          change: -0.08,
          previous: 20.63,
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

    it('Return empty object if properties missing from response', () => {
      const googleFinanceUrl = googleFinanceService.buildStockPriceFetchUrl();
      axiosMock.onGet(googleFinanceUrl).reply(200, {});

      return googleFinanceService.fetchStockPrice().then(function (result) {
        expect(result).toEqual({});
      });
    });
  });
});
