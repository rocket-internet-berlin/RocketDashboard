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
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${this.apiCityId}&appid=${this.apiKey}&units=metric`)
      .then((payload) => {
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
}

export default WeatherService;
