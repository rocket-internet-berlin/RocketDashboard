import express from 'express';
import { triviaService } from '../service';
import createCachedRouterCallback from '../helper/routerHelper';
import config from '../config';

const router = express.Router();

const triviaWidgetTTL = config.cache.triviaWidgetTTL;

router.get('/today', createCachedRouterCallback(triviaService.getTodaysTrivia.bind(triviaService), triviaWidgetTTL));

export default router;
