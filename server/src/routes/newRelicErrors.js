import express from 'express';
import Insights from 'node-insights';
import _get from 'lodash/get';
import Ajv from 'ajv';
import Cache from 'node-cache';
import config from '../config';
import getResponseSuccess from '../helper/responseHelper';

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

const stdTTL = 60; // TODO: Magic number -> config
const cache = new Cache({ stdTTL });
const cacheKey = 'newRelicErrors';

const router = express.Router();

const getResponsePayload = (insightsResponse) => getResponseSuccess({
  lastWeek: _get(insightsResponse, 'previous.results[0].count'),
  thisWeek: _get(insightsResponse, 'current.results[0].count'),
});

router.get('/', (req, res, next) => {
  const nrql = 'SELECT count(*) FROM TransactionError SINCE 7 DAYS AGO COMPARE WITH 1 week ago';

  const cachedPayload = cache.get(cacheKey);

  // TODO: Refactor to use Promise;
  if (cachedPayload) {
    res.json(cachedPayload);
  } else {
    insights.query(nrql, (err, insightsResponse) => {
      if (err) {
        next(err);
        return;
      }
      const payload = getResponsePayload(insightsResponse);
      res.json(payload);
      cache.set(cacheKey, payload);
    });
  }
});

export default router;
