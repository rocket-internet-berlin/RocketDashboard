import axios from 'axios';
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
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${this.apiCityId}&appid=${this.apiKey}&units=metric`);
  }
}

export default WeatherService;
