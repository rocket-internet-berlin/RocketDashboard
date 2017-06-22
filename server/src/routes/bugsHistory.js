import express from 'express';
import fetchSheet from '../fetchSheet';
import { getResponseSuccess } from '../helper/responseHelper';

const router = express.Router();

router.get('/', (req, res, next) => {
  const cacheKey = 'bugsHistory';
  const cacheService = req.app.locals.cacheService;
  const cachedPayload = cacheService.get(cacheKey);

  // TODO: Refactor to use Promise
  if (cachedPayload) {
    res.json(cachedPayload);
  } else {
    fetchSheet((err, json) => {
      if (err) {
        next(err);
      } else {
        res.json(getResponseSuccess(json));
        cacheService.set(cacheKey, json);
      }
    });
  }
});

export default router;
