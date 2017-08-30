import express from 'express';
import config from '../config';
import { googleFinanceService } from '../service';

const router = express.Router();

const parseStockData = (payload) => {
  const stockData = JSON.parse(payload.data.replace('//', ''))[0];
  return ({
    status: 'success',
    data: {
      current: stockData.l_fix,
      change: parseFloat(stockData.c_fix),
      previous: parseFloat(stockData.l_fix - stockData.c_fix),
      updated: new Date(),
      heading: config.finance.company,
    },
  });
};

router.get('/stock', (req, res, next) => {
  googleFinanceService.fetchStockPrice()
    .then(payload => {
      res.send(parseStockData(payload));
    })
    .catch(err => next(err));
});

export default router;
