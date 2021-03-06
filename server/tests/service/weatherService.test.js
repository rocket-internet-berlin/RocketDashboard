/* eslint-disable no-unused-vars */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import constants from '../../src/config/constants';
import WeatherService from '../../src/service/weatherService';

describe('WeatherService', () => {
  const validConfig = { apiKey: 'apiKey', apiCityId: 1 };

  describe('#constructor - config validation', () => {
    it('valid config, no exception', () => {
      expect(() => {
        const weatherService = new WeatherService(validConfig);
      }).not.toThrow();
    });
    it('throws exception on invalid config', () => {
      expect(() => {
        const weatherService = new WeatherService({ apiKey: 'a' });
      }).toThrow();
    });
  });

  describe('#fetchWeatherInfo', () => {
    let axiosMock = null;
    let weatherService = null;
    const weatherApiResponse = JSON.stringify({
      weather: [
        {
          id: 1,
          main: 'rain',
          description: 'heavy rain',
          icon: '011',
        },
      ],
      main: {
        temp: 14,
      },
      name: 'Test',
    });

    beforeEach(() => {
      axiosMock = new MockAdapter(axios);
      weatherService = new WeatherService(validConfig);
    });

    it('returns correct response', () => {
      axiosMock.onGet(weatherService.buildWeatherInfoUrl()).reply(200, weatherApiResponse);

      weatherService.fetchWeatherInfo().then((response) => {
        expect(response).toEqual(expect.objectContaining({
          city: 'Test',
          temp: 14,
          icon: '011',
          description: 'heavy rain',
        }));

        expect(response).toHaveProperty('updated');
        expect(new Date(response.updated)).not.toBe(constants.testing.invalidDateString);
      });
    });

    it('returns empty response', () => {
      axiosMock.onGet(weatherService.buildWeatherInfoUrl()).reply(200, 'invalid response');

      weatherService.fetchWeatherInfo().then((response) => {
        expect(response).toEqual({});
      });
    });
  });

  describe('#fetchWeatherForecast', () => {
    let axiosMock = null;
    let weatherService = null;
    const forecastApiResponse = JSON.stringify({
      city: {
        name: 'BerlinTest',
      },
      list: [
        {
          dt: 1485766800,
          temp: {
            min: 16.11,
            max: 26.65,
          },
          weather: [{
            id: 1,
            main: 'rain',
            description: 'heavy rain',
            icon: '011',
          }],
        },
        {
          dt: 1485766800,
          temp: {
            min: 14.41,
            max: 22.65,
          },
          weather: [{
            id: 1,
            main: 'rain',
            description: 'heavy rain',
            icon: '011',
          }],
        },
      ],
    });

    beforeEach(() => {
      axiosMock = new MockAdapter(axios);
      weatherService = new WeatherService(validConfig);
    });

    it('returns correct response', () => {
      axiosMock.onGet(weatherService.buildWeatherForcastUrl()).reply(200, forecastApiResponse);

      weatherService.fetchWeatherForecast().then((response) => {
        expect(response).toHaveProperty('result');

        const result = response.result;
        expect(result.length).toBe(2);
        expect(result[0]).toEqual(expect.objectContaining({
          temperature: [16.11, 26.65],
          temp_min: 16.11,
          temp_max: 26.65,
          icon: '011',
        }));

        expect(response).toHaveProperty('updated');
        expect(new Date(response.updated)).not.toBe(constants.testing.invalidDateString);
      });
    });

    it('returns empty response', () => {
      axiosMock.onGet(weatherService.buildWeatherForcastUrl()).reply(200, 'invalid response');

      weatherService.fetchWeatherForecast().then((response) => {
        expect(response).toEqual({});
      });
    });
  });
});
