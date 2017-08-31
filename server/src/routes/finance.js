import express from 'express';
import { googleFinanceService } from '../service';
import createCachedRouterCallback from '../helper/routerHelper';

const router = express.Router();

router.get('/stock', createCachedRouterCallback(googleFinanceService.fetchStockPrice.bind(googleFinanceService)));

export default router;
