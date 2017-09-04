/* eslint-disable no-unused-vars */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import moment from 'moment';
import sinon from 'sinon';

import constants from '../../src/config/constants';
import StatusCakeService from '../../src/service/statusCakeService';

describe('StatusCakeService', () => {
  const validConfig = { apiUrl: 'http://example.org', apiKey: 'someApi', username: 'someUser', testId: '1212' };
  const historyPeriod = 'P1D';
  const timeInterval = 'PT1H';
  const jsonData = [
    {
      Status: 'Up',
      Start: '2017-07-27 23:56:18',
      End: '2017-07-28 23:56:36',
    },
    {
      Status: 'Down',
      Start: '2017-07-27 22:42:38',
      End: '2017-07-27 23:56:18',
    },
    {
      Status: 'Up',
      Start: '2017-07-27 00:42:38',
      End: '2017-07-27 22:42:38',
    },
  ];

  describe('#constructor - Config schema validation', () => {
    it('Should not throw any error when passed a valid config', () => {
      expect(() => {
        const statusCakeService = new StatusCakeService(validConfig);
      }).not.toThrow();
    });

    it('Should throw error when passed an invalid config', () => {
      const incompleteConfig = { apiKey: 'someApi' }; // username and testId not present, should throw error

      expect(() => {
        const statusCakeService = new StatusCakeService(incompleteConfig);
      }).toThrow();
    });

    it('should initialize variable with default values', () => {
      const statusCakeService = new StatusCakeService(validConfig);
      expect(moment.isMoment(statusCakeService.startDate)).toBe(true);
      expect(moment.isMoment(statusCakeService.endDate)).toBe(true);
      expect(moment.isDuration(statusCakeService.timeInterval)).toBe(true);
      expect(statusCakeService.startDate.isBefore(statusCakeService.endDate)).toBe(true);
    });

    it('Should correctly initialize class variables', () => {
      const config = Object.assign({}, validConfig, { period: historyPeriod, interval: timeInterval });
      const statusCakeService = new StatusCakeService(config);

      expect(moment.isMoment(statusCakeService.startDate)).toBe(true);
      expect(moment.isMoment(statusCakeService.endDate)).toBe(true);
      expect(moment.isDuration(statusCakeService.timeInterval)).toBe(true);
      expect(statusCakeService.startDate.isBefore(statusCakeService.endDate)).toBe(true);
    });
  });

  describe('#getHistory', () => {
    let statusCakeService = null;
    let axiosMock = null;

    beforeEach(() => {
      const config = Object.assign({}, validConfig, { period: historyPeriod, interval: timeInterval });
      statusCakeService = new StatusCakeService(config);
      axiosMock = new MockAdapter(axios);
    });

    it('processes fetched data correctly', () => {
      const startDate = moment('2017-07-27T00:00:00');
      const endDate = moment('2017-07-28T00:00:00');

      sinon.stub(statusCakeService, 'startDate').value(startDate);
      sinon.stub(statusCakeService, 'endDate').value(endDate);

      axiosMock.onGet(validConfig.apiUrl).reply(200, jsonData);

      return statusCakeService.getHistory().then((response) => {
        expect(response.history).toHaveLength(24);
        expect(response).toHaveProperty('updated');
        expect(new Date(response.updated)).not.toBe(constants.testing.invalidDateString);
      });
    });

    it('handle error', () => {
      const errorResponse = { Error: 'Error!' };
      axiosMock.onGet(validConfig.apiUrl).reply(200, errorResponse);

      return statusCakeService.getHistory().catch((error) => {
        expect(error).toMatch('Error!');
      });
    });
  });

  describe('#convertToGraph', () => {
    let statusCakeService = null;

    beforeEach(() => {
      const config = Object.assign({}, validConfig, { period: historyPeriod, interval: timeInterval });
      statusCakeService = new StatusCakeService(config);
    });

    it('correctly creates data array', () => {
      const startDate = moment('2017-07-27T00:00:00');
      const endDate = moment('2017-07-28T00:00:00');

      sinon.stub(statusCakeService, 'startDate').value(startDate);
      sinon.stub(statusCakeService, 'endDate').value(endDate);

      const result = statusCakeService.convertToGraph(jsonData);
      expect(result).toHaveLength(24);
      expect(result).toEqual(expect.arrayContaining([{ date: '01:00', status: 1 }]));
      expect(result).toEqual(expect.arrayContaining([{ date: '10:00', status: 1 }]));
      expect(result).toEqual(expect.arrayContaining([{ date: '23:00', status: 0 }]));
    });

    it('correctly creates data array test#2', () => {
      const startDate = moment('2017-07-27T12:00:00');
      const endDate = moment('2017-07-27T23:59:00');

      sinon.stub(statusCakeService, 'startDate').value(startDate);
      sinon.stub(statusCakeService, 'endDate').value(endDate);

      const result = statusCakeService.convertToGraph(jsonData);
      expect(result).toHaveLength(12);
      expect(result).not.toEqual(expect.arrayContaining([{ date: '01:00', status: 1 }]));
      expect(result).not.toEqual(expect.arrayContaining([{ date: '10:00', status: 1 }]));
      expect(result).toEqual(expect.arrayContaining([{ date: '13:00', status: 1 }]));
      expect(result).toEqual(expect.arrayContaining([{ date: '21:00', status: 1 }]));
      expect(result).toEqual(expect.arrayContaining([{ date: '23:00', status: 0 }]));
    });
  });
});
