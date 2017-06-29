import express from 'express';
import config from '../config';
import { getResponseSuccess } from '../helper/responseHelper';
import { cacheService } from '../service';

const router = express.Router();

router.get('/', (req, res, next) => {
  const cacheService = req.app.locals.services.cacheService;
  const googleService = req.app.locals.services.googleService;

  const cacheKey = req.baseUrl;
  const cachedPayload = cacheService.get(cacheKey);

  // TODO: Refactor to use Promise
  if (cachedPayload) {
    res.json(getResponseSuccess(cachedPayload));
  } else {
    googleService.fetchSheet(config.bugsHistory.spreadsheetId, (err, json) => {
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
