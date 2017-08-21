import _get from 'lodash/get';
import { isEmpty, isUndefined } from 'lodash/core';
import Insights from 'node-insights';
import validateSchema from '../helper/validator';
import constants from '../config/constants';

class NewRelicService {
  static validateConfig(config) {
    const schema = {
      required: [
        'accountId',
        'queryKey',
      ],
    };
    if (!validateSchema(schema, config)) {
      throw new Error('Invalid configuration properties');
    }
  }

  constructor(config) {
    NewRelicService.validateConfig(config);

    this.insights = null;
    this.config = config;
  }

  getQueryResponse(nrql) {
    return new Promise((resolve, reject) => {
      this.getInstance().query(nrql, (err, insightsResponse) => {
        if (err || (!isUndefined(insightsResponse.error) && !isEmpty(insightsResponse.error))) {
          return reject(err);
        }
        return resolve(insightsResponse);
      });
    });
  }

  static getDescription(insightsResponse) {
    const since = _get(insightsResponse, 'metadata.rawSince', null);
    const compareWith = _get(insightsResponse, 'metadata.rawCompareWith', null);

    if (since && compareWith) {
      const description = compareWith ? `Since ${since} COMPARE WITH ${compareWith}` : `Since ${since}`;
      return description.toLowerCase();
    }

    return '';
  }

  static errorHandler() {
    return {
      current: constants.unknown,
      description: 'Newrelic is probably not setup correctly.',
    };
  }

  getTransactionErrors() {
    const nrql = 'SELECT count(*) FROM TransactionError WHERE appName = \'www.campsy.de\' SINCE 30 minutes AGO COMPARE WITH 30 minutes ago';

    return this.getQueryResponse(nrql)
      .then((insightsResponse) => ({
        previous: _get(insightsResponse, 'previous.results[0].count', constants.unknown),
        current: _get(insightsResponse, 'current.results[0].count', constants.unknown),
        description: NewRelicService.getDescription(insightsResponse),
      }), NewRelicService.errorHandler);
  }

  getLoadTime() {
    const nrql = 'SELECT average(duration) from Transaction WHERE appName = \'www.campsy.de\' since 10 minutes ago';

    return this.getQueryResponse(nrql)
      .then((insightsResponse) => ({
        current: _get(insightsResponse, 'results[0].average', constants.unknown),
        description: NewRelicService.getDescription(insightsResponse),
        updated: new Date(),
      }), NewRelicService.errorHandler);
  }

  getUniqueSessions() {
    const nrql = 'SELECT count(session) FROM PageView SINCE 20 minutes ago COMPARE WITH 20 minutes ago';

    return this.getQueryResponse(nrql)
      .then((insightsResponse) => ({
        previous: _get(insightsResponse, 'previous.results[0].count', constants.unknown),
        current: _get(insightsResponse, 'current.results[0].count', constants.unknown),
        description: NewRelicService.getDescription(insightsResponse),
      }), NewRelicService.errorHandler);
  }

  getSuccessfulBookings() {
    const nrql = 'SELECT count(session) FROM PageView WHERE pageUrl like \'https://www.campsy.de/booking/%/success%\' and pageUrl not like \'%pay-later%\' SINCE 1 day ago COMPARE WITH 1 day ago';

    return this.getQueryResponse(nrql)
      .then((insightsResponse) => ({
        previous: _get(insightsResponse, 'previous.results[0].count', constants.unknown),
        current: _get(insightsResponse, 'current.results[0].count', constants.unknown),
        description: NewRelicService.getDescription(insightsResponse),
      }), NewRelicService.errorHandler);
  }

  getCLIErrors() {
    const nrql = 'SELECT count(*) from TransactionError WHERE appName = \'cli.campsy.de\' SINCE 30 minutes ago';

    return this.getQueryResponse(nrql)
      .then((insightsResponse) => ({
        current: _get(insightsResponse, 'results[0].count', constants.unknown),
        description: NewRelicService.getDescription(insightsResponse),
        updated: new Date(),
      }), NewRelicService.errorHandler);
  }

  getErrorBreakdown() {
    const nrql = 'SELECT count(*) from TransactionError WHERE appName = \'www.campsy.de\' SINCE 1 day ago FACET `error.class`';

    return this.getQueryResponse(nrql)
      .then((insightsResponse) => {
        const results = _get(insightsResponse, 'facets').map(facet => ({
          name: _get(facet, 'name'),
          count: _get(facet, 'results[0].count'),
        }));
        return {
          results,
          description: NewRelicService.getDescription(insightsResponse),
        };
      }, NewRelicService.errorHandler);
  }

  getWebsiteFunnel() {
    const nrql = 'SELECT funnel(session, WHERE pageUrl LIKE \'https://www.campsy.%/\' AS \'Home Page\', WHERE pageUrl like \'https://www.campsy.%search/geo%\' AS \'Search Page\', WHERE pageUrl like \'https://www.campsy.%booking/checkout%\' AS \'Checkout Step 1\', WHERE pageUrl LIKE \'https://www.campsy.%booking/%/details%\' AS \'Checkout Step 2\', WHERE pageUrl like \'https://www.campsy.%booking/%/payment%\' AS \'Checkout Step 3\', WHERE pageUrl LIKE \'https://www.campsy.%/booking/%/success\' AS \'Checkout Success\') FROM PageView SINCE 1 day ago';

    return this.getQueryResponse(nrql)
      .then((insightsResponse) => {
        const results = _get(insightsResponse, 'results[0].steps').map((value, index) => ({
          name: _get(insightsResponse, `metadata.contents[0].steps[${index}]`),
          count: value,
        }));
        return {
          results,
          description: NewRelicService.getDescription(insightsResponse),
        };
      }, NewRelicService.errorHandler);
  }

  getInstance() {
    if (this.insights) {
      return this.insights;
    }

    if (!this.config.accountId) {
      throw new Error('NewRelic Insights accountId may not be empty.');
    }

    this.insights = new Insights({
      accountId: this.config.accountId,
      queryKey: this.config.queryKey,
    });

    return this.insights;
  }
}

export default NewRelicService;
