import express from 'express';
import fetchSheet from '../fetchSheet';
import { getResponseSuccess } from '../helper/responseHelper';

const router = express.Router();

router.get('/', (req, res, next) => {
  const cacheKey = req.baseUrl;
  const cacheService = req.app.locals.cacheService;
  const cachedPayload = cacheService.get(cacheKey);

  // TODO: Refactor to use Promise
  if (cachedPayload) {
    res.json(getResponseSuccess(cachedPayload));
  } else {
    fetchSheet((err, json) => {
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
