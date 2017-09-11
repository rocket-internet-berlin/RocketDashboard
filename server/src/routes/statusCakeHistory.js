import express from 'express';

import config from '../config';
import { statusCakeService } from '../service';
import createCachedRouterCallback from '../helper/routerHelper';

const statusCakeHistoryTTL = config.cache.statusCakeHistoryTTL;
const router = express.Router();

router.get('/', createCachedRouterCallback(statusCakeService.getHistory.bind(statusCakeService), statusCakeHistoryTTL));

export default router;
