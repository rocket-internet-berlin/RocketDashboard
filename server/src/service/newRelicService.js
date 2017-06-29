import _get from 'lodash/get';
import Insights from 'node-insights';
import validateSchema from '../helper/validator';

class NewRelicService {
  constructor(config) {
    NewRelicService.validateConfig(config);

    this.insights = new Insights({
      queryKey: config.queryKey,
      accountId: config.accountId,
    });
  }

  getTransactionErrorsWeek() {
    const nrql = 'SELECT count(*) FROM TransactionError WHERE appName = \'www.campsy.de\' SINCE 7 DAYS AGO COMPARE WITH 1 week ago';

    return Promise(() => {
      this.insights.query(nrql, (err, insightsResponse) => {
        if (err) {
          throw new Error(err);
        }
        return {
          previous: _get(insightsResponse, 'previous.results[0].count'),
          current: _get(insightsResponse, 'current.results[0].count'),
        };
      });
    });
  }

  static validateConfig(config) {
    const schema = {
      required: [
        'queryKey',
        'accountId',
      ],
    };
    if (!validateSchema(schema, config)) {
      throw new Error('Invalid configuration properties');
    }
  }
}

export default NewRelicService;
