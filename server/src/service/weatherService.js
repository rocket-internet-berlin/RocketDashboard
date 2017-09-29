import axios from 'axios';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import moment from 'moment';

import validateSchema from '../helper/validator';

class WeatherService {
  static validateConfig(config) {
    const schema = {
      required: [
        'apiKey',
        'apiCityId',
      ],
    };
    if (!validateSchema(schema, config)) {
      throw new Error('Invalid configuration properties');
    }
  }

  constructor(config) {
    WeatherService.validateConfig(config);

    this.apiKey = config.apiKey;
    this.apiCityId = config.apiCityId;
  }

  fetchWeatherInfo() {
    return axios.get(this.buildWeatherInfoUrl())
      .then((payload) => {
        if (isEmpty(payload.data) || !isObject(payload.data)) {
          return {};
        }

        const weatherData = payload.data;
        return ({
          city: weatherData.name,
          temp: parseInt(weatherData.main.temp, 10),
          icon: weatherData.weather[0].icon,
          description: weatherData.weather[0].description,
          updated: new Date(),
        });
      });
  }

  fetchWeatherForecast() {
    return axios.get(this.buildWeatherForcastUrl())
      .then((payload) => {
        if (isEmpty(payload.data) || !isObject(payload.data)) {
          return {};
        }

        const weatherData = payload.data;
        return ({
          result: WeatherService.formatDataForChart(weatherData),
          updated: new Date(),
        });
      });
  }

  static formatDataForChart(response) {
    const result = [];

    forEach(response.list, (resp) => {
      const dt = moment(resp.dt, 'X');
      result.push({
        date: dt.format('DD-MMM'),
        temperature: [resp.temp.min, resp.temp.max],
        temp_min: resp.temp.min,
        temp_max: resp.temp.max,
        icon: resp.weather[0].icon,
      });
    });

    return result;
  }

  buildWeatherInfoUrl() {
    return `http://api.openweathermap.org/data/2.5/weather?id=${this.apiCityId}&appid=${this.apiKey}&units=metric`;
  }

  buildWeatherForcastUrl() {
    return `http://api.openweathermap.org/data/2.5/forecast/daily?id=${this.apiCityId}&appid=${this.apiKey}&units=metric&cnt=7`;
  }
}

export default WeatherService;
