import express from 'express';
import config from '../config';
import { getResponseSuccess } from '../helper/responseHelper';
import { cacheService, googleSheetsService } from '../service';

const router = express.Router();

// TODO: Refactor GoogleSheetsService to use Promise so we can use createCachedRouterCallback method
router.get('/', (req, res, next) => {
  const cacheKey = req.baseUrl;

  const fetchCallback = (err, result) => {
    const cachedPayload = JSON.parse(result);

    if (cachedPayload) {
      res.json(getResponseSuccess(cachedPayload));
      return;
    }

    const saveCallback = (error, payload) => {
      if (error) {
        next(error);
      }
      cacheService.set(cacheKey, payload);
      res.json(getResponseSuccess(payload));
    };

    googleSheetsService.fetchSheet(config.bugsHistory.spreadsheetId, config.bugsHistory.dataRange, saveCallback);
  };

  return cacheService.get(cacheKey, fetchCallback);
});

export default router;
