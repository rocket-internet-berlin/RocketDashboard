import express from 'express';
import Insights from 'node-insights';
import _get from 'lodash/get';
import Ajv from 'ajv';
import config from '../config/config';

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

router.get('/', (req, res) => {
  const nrql = 'SELECT count(*) FROM TransactionError SINCE 7 DAYS AGO COMPARE WITH 1 week ago';

  insights.query(nrql, (err, responseBody) => {
    res.json({
      status: 'success',
      message: '',
      data: {
        lastWeek: _get(responseBody, 'previous.results[0].count'),
        thisWeek: _get(responseBody, 'current.results[0].count'),
      },
    });
  });
});

export default router;
