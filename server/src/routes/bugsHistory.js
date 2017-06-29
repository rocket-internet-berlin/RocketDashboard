import express from 'express';
import config from '../config';
import { getResponseSuccess } from '../helper/responseHelper';
import { cacheService, googleService } from '../service';

const router = express.Router();

router.get('/', (req, res, next) => {
  const cacheKey = req.baseUrl;
  const cachedPayload = cacheService.get(cacheKey);

  // TODO: Refactor to use Promise
  if (cachedPayload) {
    res.json(getResponseSuccess(cachedPayload));
  } else {
    googleService.fetchSheet(config.bugsHistory.spreadsheetId, config.bugsHistory.dataRange, (err, json) => {
      if (err) {
        next(err);
      } else {
        cacheService.set(cacheKey, json);
        res.json(getResponseSuccess(json));
      }
    });
  }
});

export default router;
