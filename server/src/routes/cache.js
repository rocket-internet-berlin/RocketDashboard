import express from 'express';
import { getResponseSuccess, getResponseError } from '../helper/responseHelper';
import { cacheService } from '../service';

const router = express.Router();

router.get('/index', (req, res) => {
  const sendResultsCallback = (err, result) => {
    if (err) {
      res.json(getResponseError(err));
      return;
    }
    res.json(getResponseSuccess(result));
  };

  cacheService.keys(sendResultsCallback);
});

router.get('/clear', (req, res) => res.json(getResponseSuccess(cacheService.clear())));

export default router;
