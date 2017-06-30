import express from 'express';
import { getResponseSuccess } from '../helper/responseHelper';
import { cacheService, newRelicService } from '../service';

const router = express.Router();

router.get('/', (req, res, next) => {
  const cacheKey = req.baseUrl;
  const cachedPayload = cacheService.get(cacheKey);

  if (cachedPayload) {
    res.json(getResponseSuccess(cachedPayload));
    return;
  }

  newRelicService.getTransactionErrorsWeek()
      .then((payload) => {
        cacheService.set(cacheKey, payload);
        res.json(getResponseSuccess(payload));
      })
      .catch((err) => {
        next(err);
      });
});

export default router;
