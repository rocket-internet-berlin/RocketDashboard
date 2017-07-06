import express from 'express';
import { getResponseSuccess } from '../helper/responseHelper';
import { cacheService, newRelicService } from '../service';

const router = express.Router();

router.get('/errors', (req, res, next) => {
  const cacheKey = req.originalUrl;
  const cachedPayload = cacheService.get(cacheKey);

  if (cachedPayload) {
    res.json(getResponseSuccess(cachedPayload));
    return;
  }

  newRelicService.getTransactionErrors()
      .then((payload) => {
        cacheService.set(cacheKey, payload);
        res.json(getResponseSuccess(payload));
      })
      .catch((err) => {
        next(err);
      });
});

router.get('/loadTime', (req, res, next) => {
  const cacheKey = req.originalUrl;
  const cachedPayload = cacheService.get(cacheKey);

  if (cachedPayload) {
    res.json(getResponseSuccess(cachedPayload));
    return;
  }

  newRelicService.getLoadTime()
      .then((payload) => {
        cacheService.set(cacheKey, payload);
        res.json(getResponseSuccess(payload));
      })
      .catch((err) => {
        next(err);
      });
});

router.get('/uniqueSessions', (req, res, next) => {
  const cacheKey = req.originalUrl;
  const cachedPayload = cacheService.get(cacheKey);

  if (cachedPayload) {
    res.json(getResponseSuccess(cachedPayload));
    return;
  }

  newRelicService.getUniqueSessions()
      .then((payload) => {
        cacheService.set(cacheKey, payload);
        res.json(getResponseSuccess(payload));
      })
      .catch((err) => {
        next(err);
      });
});

router.get('/successBookings', (req, res, next) => {
  const cacheKey = req.originalUrl;
  const cachedPayload = cacheService.get(cacheKey);

  if (cachedPayload) {
    res.json(getResponseSuccess(cachedPayload));
    return;
  }

  newRelicService.getSuccessBookings()
      .then((payload) => {
        cacheService.set(cacheKey, payload);
        res.json(getResponseSuccess(payload));
      })
      .catch((err) => {
        next(err);
      });
});

router.get('/cliErrors', (req, res, next) => {
  const cacheKey = req.originalUrl;
  const cachedPayload = cacheService.get(cacheKey);

  if (cachedPayload) {
    res.json(getResponseSuccess(cachedPayload));
    return;
  }

  newRelicService.getCLIErrors()
      .then((payload) => {
        cacheService.set(cacheKey, payload);
        res.json(getResponseSuccess(payload));
      })
      .catch((err) => {
        next(err);
      });
});

export default router;
