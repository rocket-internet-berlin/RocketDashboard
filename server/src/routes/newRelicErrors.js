import express from 'express';
import Insights from 'node-insights';
import _get from 'lodash/get';
import Ajv from 'ajv';
import config from '../config';
import { getResponseSuccess } from '../helper/responseHelper';

// validate required config props
const ajv = new Ajv();
const validate = ajv.compile({
  required: [
    'queryKey',
    'accountId',
  ],
});
if (!validate(config.newRelic)) {
  throw ajv.errorsText(validate.errors);
}

const insights = new Insights({
  queryKey: config.newRelic.queryKey,
  accountId: config.newRelic.accountId,
});

const router = express.Router();

router.get('/', (req, res, next) => {
  const nrql = 'SELECT count(*) FROM TransactionError WHERE appName = \'www.campsy.de\' SINCE 7 DAYS AGO COMPARE WITH 1 week ago';

  const cacheKey = req.baseUrl;
  const cacheService = req.app.locals.cacheService;
  const cachedPayload = cacheService.get(cacheKey);

  // TODO: Refactor to use Promise;
  if (cachedPayload) {
    res.json(getResponseSuccess(cachedPayload));
  } else {
    insights.query(nrql, (err, insightsResponse) => {
      if (err) {
        next(err);
        return;
      }
      const payload = {
        previous: _get(insightsResponse, 'previous.results[0].count'),
        current: _get(insightsResponse, 'current.results[0].count'),
      };
      res.json(getResponseSuccess(payload));
      cacheService.set(cacheKey, payload);
    });
  }
});

export default router;
