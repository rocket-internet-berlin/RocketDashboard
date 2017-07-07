import _get from 'lodash/get';
import Insights from 'node-insights';
import validateSchema from '../helper/validator';

class NewRelicService {
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

  getUniqueSessions() {
    const nrql = 'SELECT count(session) FROM PageView SINCE 20 minutes ago COMPARE WITH 20 minutes ago';

    return this.getQueryResponse(nrql)
      .then((insightsResponse) => ({
        previous: _get(insightsResponse, 'previous.results[0].count'),
        current: _get(insightsResponse, 'current.results[0].count'),
      }));
  }

  getSuccessfulBookings() {
    const nrql = 'SELECT count(session) FROM PageView WHERE pageUrl like \'https://www.campsy.de/booking/%/success%\' and pageUrl not like \'%pay-later%\' SINCE 1 day ago COMPARE WITH 1 day ago';

    return this.getQueryResponse(nrql)
      .then((insightsResponse) => ({
        previous: _get(insightsResponse, 'previous.results[0].count'),
        current: _get(insightsResponse, 'current.results[0].count'),
      }));
  }

  getCLIErrors() {
    const nrql = 'SELECT count(*) from TransactionError WHERE appName = \'cli.campsy.de\' SINCE 30 minutes ago';

    return this.getQueryResponse(nrql)
      .then((insightsResponse) => ({
        current: _get(insightsResponse, 'results[0].count'),
      }));
  }

  getErrorBreakdown() {
    const nrql = 'SELECT count(*) from TransactionError WHERE appName = \'www.campsy.de\' SINCE 1 day ago FACET `error.class`';

    return this.getQueryResponse(nrql)
      .then((insightsResponse) => {
        const errors = [];
        _get(insightsResponse, 'facets').forEach(facet => {
          errors.push({
            name: _get(facet, 'name'),
            count: _get(facet, 'results[0].count'),
          });
        });
        return errors;
      });
  }

  getWebsiteFunnel() {
    const nrql = 'SELECT funnel(session, WHERE pageUrl LIKE \'https://www.campsy.%/\' AS \'Home Page\', WHERE pageUrl like \'https://www.campsy.%search/geo%\' AS \'Search Page\', WHERE pageUrl like \'https://www.campsy.%booking/checkout%\' AS \'Checkout Step 1\', WHERE pageUrl LIKE \'https://www.campsy.%booking/%/details%\' AS \'Checkout Step 2\', WHERE pageUrl like \'https://www.campsy.%booking/%/payment%\' AS \'Checkout Step 3\', WHERE pageUrl LIKE \'https://www.campsy.%/booking/%/success\' AS \'Checkout Success\') FROM PageView SINCE 1 day ago';

    return this.getQueryResponse(nrql)
      .then((insightsResponse) => {
        const errors = [];
        _get(insightsResponse, 'results[0].steps').forEach((value, index) => {
          errors.push({
            name: _get(insightsResponse, `metadata.contents[0].steps[${index}]`),
            count: value,
          });
        });
        console.log(errors);
        return errors;
      });
  }
}

export default NewRelicService;
