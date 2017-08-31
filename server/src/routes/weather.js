import express from 'express';
import { weatherService } from '../service';
import createCachedRouterCallback from '../helper/routerHelper';

const router = express.Router();

router.get('/current', createCachedRouterCallback(weatherService.fetchWeatherInfo.bind(weatherService)));

export default router;
