import express from 'express';
import { weatherService } from '../service';

const router = express.Router();

const parseWeatherData = (payload) => {
  const weatherData = payload.data;
  return ({
    status: 'success',
    data: {
      city: weatherData.name,
      temp: parseInt(weatherData.main.temp, 10),
      icon: weatherData.weather[0].icon,
      description: weatherData.weather[0].description,
      updated: new Date(),
    },
  });
};

router.get('/current', (req, res, next) => {
  weatherService.fetchWeatherInfo()
    .then(payload => {
      res.send(parseWeatherData(payload));
    })
    .catch(err => next(err));
});

export default router;
