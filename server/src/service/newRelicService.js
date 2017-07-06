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

  getQueryResponse(nrql) {
    return new Promise((resolve, reject) => {
      this.insights.query(nrql, (err, insightsResponse) => {
        if (err) {
          reject(err);
        }
        resolve(insightsResponse);
      });
    });
  }

  getTransactionErrors() {
    const nrql = 'SELECT count(*) FROM TransactionError WHERE appName = \'www.campsy.de\' SINCE 30 minutes AGO COMPARE WITH 30 minutes ago';

    return this.getQueryResponse(nrql)
      .then((insightsResponse) => ({
        previous: _get(insightsResponse, 'previous.results[0].count'),
        current: _get(insightsResponse, 'current.results[0].count'),
      }));
  }

  getLoadTime() {
    const nrql = 'SELECT average(duration) from Transaction WHERE appName = \'www.campsy.de\' since 10 minutes ago';

    return this.getQueryResponse(nrql)
      .then((insightsResponse) => ({
        current: _get(insightsResponse, 'results[0].average'),
      }));
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
