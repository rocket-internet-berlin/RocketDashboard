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
    this.newrelicSite = 'www.campsy.de';
    this.newrelicCliSite = 'cli.campsy.de';
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

  buildTransactionErrorQuery() {
    return `SELECT count(*) FROM TransactionError WHERE appName = '${this.newrelicSite}' SINCE 30 minutes AGO COMPARE WITH 30 minutes ago`;
  }

  buildLoadTimeQuery() {
    return `SELECT average(duration) from Transaction WHERE appName = '${this.newrelicSite}' since 10 minutes ago`;
  }

  buildUniqueSessionsQuery() {
    return `SELECT count(session) FROM PageView WHERE appName = '${this.newrelicSite}' SINCE 20 minutes ago COMPARE WITH 20 minutes ago`;
  }

  buildSuccessfulBookingsQuery() {
    return `
      SELECT count(session)
      FROM PageView
      WHERE pageUrl like 'https://${this.newrelicSite}/booking/%/success%'
        and pageUrl not like '%pay-later%'
      SINCE 1 day ago
      COMPARE WITH 1 day ago
    `;
  }

  buildCliErrorsQuery() {
    return `SELECT count(*) from TransactionError WHERE appName = '${this.newrelicCliSite}' SINCE 30 minutes ago`;
  }

  buildErrorBreakdownQuery() {
    return `SELECT count(*) from TransactionError WHERE appName = '${this.newrelicSite}' SINCE 1 day ago FACET \`error.class\``;
  }

  buildWebsiteFunnelQuery() { // eslint-disable-line
    return `SELECT funnel(
        session,
        WHERE pageUrl LIKE 'https://www.campsy.%/' AS 'Home Page',
        WHERE pageUrl like 'https://www.campsy.%search/geo%' AS 'Search Page',
        WHERE pageUrl like 'https://www.campsy.%booking/checkout%' AS 'Checkout Step 1',
        WHERE pageUrl LIKE 'https://www.campsy.%booking/%/details%' AS 'Checkout Step 2',
        WHERE pageUrl like 'https://www.campsy.%booking/%/payment%' AS 'Checkout Step 3',
        WHERE pageUrl LIKE 'https://www.campsy.%/booking/%/success' AS 'Checkout Success'
      )
      FROM PageView SINCE 1 day ago
    `;
  }

  static getDescription(insightsResponse) {
    const since = _get(insightsResponse, 'metadata.rawSince', null);
    const compareWith = _get(insightsResponse, 'metadata.rawCompareWith', null);
    let description = '';

    if (since && !compareWith) {
      description = `Since ${since}`;
    }
    if (since && compareWith) {
      description = `Since ${since} COMPARE WITH ${compareWith}`;
    }

    return description.toLowerCase();
  }

  static errorHandler() {
    throw new Error('Error getting response from newrelic.');
  }

  getTransactionErrors() {
    return this.getQueryResponse(this.buildTransactionErrorQuery())
      .then((insightsResponse) => ({
        previous: _get(insightsResponse, 'previous.results[0].count', constants.unknown),
        current: _get(insightsResponse, 'current.results[0].count', constants.unknown),
        description: NewRelicService.getDescription(insightsResponse),
      }), NewRelicService.errorHandler);
  }

  getLoadTime() {
    return this.getQueryResponse(this.buildLoadTimeQuery())
      .then((insightsResponse) => ({
        current: _get(insightsResponse, 'results[0].average', constants.unknown),
        description: NewRelicService.getDescription(insightsResponse),
        updated: new Date(),
      }), NewRelicService.errorHandler);
  }

  getUniqueSessions() {
    return this.getQueryResponse(this.buildUniqueSessionsQuery())
      .then((insightsResponse) => ({
        previous: _get(insightsResponse, 'previous.results[0].count', constants.unknown),
        current: _get(insightsResponse, 'current.results[0].count', constants.unknown),
        description: NewRelicService.getDescription(insightsResponse),
      }), NewRelicService.errorHandler);
  }

  getSuccessfulBookings() {
    return this.getQueryResponse(this.buildSuccessfulBookingsQuery())
      .then((insightsResponse) => ({
        previous: _get(insightsResponse, 'previous.results[0].count', constants.unknown),
        current: _get(insightsResponse, 'current.results[0].count', constants.unknown),
        description: NewRelicService.getDescription(insightsResponse),
      }), NewRelicService.errorHandler);
  }

  getCLIErrors() {
    return this.getQueryResponse(this.buildCliErrorsQuery())
      .then((insightsResponse) => ({
        current: _get(insightsResponse, 'results[0].count', constants.unknown),
        description: NewRelicService.getDescription(insightsResponse),
        updated: new Date(),
      }), NewRelicService.errorHandler);
  }

  getErrorBreakdown() {
    return this.getQueryResponse(this.buildErrorBreakdownQuery())
      .then((insightsResponse) => {
        const results = _get(insightsResponse, 'facets').map(facet => ({
          name: _get(facet, 'name'),
          count: _get(facet, 'results[0].count'),
        }));
        return {
          results,
          description: NewRelicService.getDescription(insightsResponse),
          updated: new Date(),
        };
      }, NewRelicService.errorHandler);
  }

  getWebsiteFunnel() {
    return this.getQueryResponse(this.buildWebsiteFunnelQuery())
      .then((insightsResponse) => {
        const results = _get(insightsResponse, 'results[0].steps').map((value, index) => ({
          name: _get(insightsResponse, `metadata.contents[0].steps[${index}]`),
          count: value,
        }));
        return {
          results,
          description: NewRelicService.getDescription(insightsResponse),
          updated: new Date(),
        };
      }, NewRelicService.errorHandler);
  }

  getInstance() {
    if (this.insights) {
      return this.insights;
    }

    // Lodash/isEmpty function requires accountId to be string
    if (isEmpty(this.config.accountId)) {
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
