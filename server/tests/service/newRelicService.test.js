/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import _get from 'lodash/get';
import { isEmpty, isUndefined } from 'lodash/core';
import Insights from 'node-insights';
import sinon from 'sinon';

import constants from '../../src/config/constants';
import NewRelicService from '../../src/service/newRelicService';

describe('NewRelicService', () => {
  const validConfig = { accountId: '1111', queryKey: 'ABCD' };

  describe('#constructor', () => {
    it('valid config, no exception', () => {
      expect(() => {
        const newRelicService = new NewRelicService(validConfig);
      }).not.toThrow();
    });
    it('throws exception on invalid config', () => {
      expect(() => {
        const newRelicService = new NewRelicService({ accountId: 112 });
      }).toThrow();
    });
  });

  describe('#getInstance', () => {
    it('creates Insights instance', () => {
      const newRelicService = new NewRelicService(validConfig);
      const instance = newRelicService.getInstance();
      expect(instance).toBeInstanceOf(Insights);
    });
    it('get instance is singleton', () => {
      const newRelicService = new NewRelicService(validConfig);
      const instance = newRelicService.getInstance();
      expect(instance).toBeInstanceOf(Insights);
      const instance2 = newRelicService.getInstance();
      expect(instance2).toBeInstanceOf(Insights);
    });
    it('throws exception', () => {
      const newRelicService = new NewRelicService({ accountId: 1111, queryKey: 'test' });
      expect(() => newRelicService.getInstance()).toThrow();
    });
  });

  describe('#getQueryResponse', () => {
    let newRelicService = null;
    let insightsInstance = null;

    beforeEach(() => {
      newRelicService = new NewRelicService(validConfig);
    });

    it('resolves', () => {
      const getInstanceStub = sinon.stub(newRelicService, 'getInstance');
      insightsInstance = sinon.createStubInstance(Insights);
      const callback = sinon.spy();

      insightsInstance.query
        .callsFake((err, done) => {
          done(null, { status: true });
        });

      getInstanceStub.returns(insightsInstance);

      const result = newRelicService.getQueryResponse('query');
      return result.then((resp) => {
        expect(resp).toEqual({ status: true });
      }).catch((err) => {
        expect(err).toBe(null);
      });
    });

    it('rejects', () => {
      const getInstanceStub = sinon.stub(newRelicService, 'getInstance');
      insightsInstance = sinon.createStubInstance(Insights);
      const callback = sinon.spy();

      insightsInstance.query
        .callsFake((err, done) => {
          done({ error: true }, { status: 'error' });
        });

      getInstanceStub.returns(insightsInstance);

      const result = newRelicService.getQueryResponse('query');

      return result.then((resp) => {
        expect(resp).toEqual({ status: 'error' });
      }).catch((err) => {
        expect(err).toEqual({ error: true });
      });
    });

    it('rejects on error response', () => {
      const getInstanceStub = sinon.stub(newRelicService, 'getInstance');
      insightsInstance = sinon.createStubInstance(Insights);
      const callback = sinon.spy();

      insightsInstance.query
        .callsFake((err, done) => {
          done(null, { error: 'error' });
        });

      getInstanceStub.returns(insightsInstance);

      const result = newRelicService.getQueryResponse('query');

      return result.then((resp) => {
        expect(resp).toEqual({ error: 'error' });
      }).catch((err) => {
        expect(err).toBe(null);
      });
    });
  });

  describe('#getTransactionErrors', () => {
    let newRelicService = null;
    let result = null;

    beforeEach(() => {
      newRelicService = new NewRelicService(validConfig);
      result = {
        previous: { results: [{ count: 10 }] },
        current: { results: [{ count: 12 }] },
        metadata: { rawSince: 'some date', rawCompareWith: 'some other date' },
      };

      const getQueryResponseStub = sinon.stub(newRelicService, 'getQueryResponse');
      const query = newRelicService.buildTransactionErrorQuery();

      getQueryResponseStub.callsFake((nrql) => {
        return new Promise((resolve, reject) => {
          // Resolve to result if the query string is correct
          if (nrql === query) {
            resolve(result);
          } else {
            reject();
          }
        });
      });
    });

    it('fetches transaction errors resolve', () => {
      return newRelicService.getTransactionErrors().then((response) => {
        expect(response).toEqual(expect.objectContaining({ current: 12, previous: 10 }));
      });
    });

    it('fetch transaction errors reject', () => {
      // Change newrelicSite variable to some other value
      // It will force the promise to reject
      sinon.stub(newRelicService, 'newrelicSite').value('');

      return newRelicService.getTransactionErrors().catch((error) => {
        expect(error).toBeInstanceOf(Error);
      });
    });
  });

  describe('#getLoadTime', () => {
    let newRelicService = null;
    let result = null;

    beforeEach(() => {
      newRelicService = new NewRelicService(validConfig);
      result = {
        results: [{ average: 10 }],
        metadata: { rawSince: 'some date' },
      };

      const getQueryResponseStub = sinon.stub(newRelicService, 'getQueryResponse');
      const query = newRelicService.buildLoadTimeQuery();

      getQueryResponseStub.callsFake((nrql) => {
        return new Promise((resolve, reject) => {
          // Resolve to result if the query string is correct
          if (nrql === query) {
            resolve(result);
          } else {
            reject();
          }
        });
      });
    });

    it('fetches loadtime resolve', () => {
      return newRelicService.getLoadTime().then((response) => {
        expect(response).toEqual(expect.objectContaining({ current: 10 }));
        expect(new Date(response.updated)).not.toBe(constants.testing.invalidDateString);
      });
    });

    it('fetch loadtime reject', () => {
      // Change newrelicSite variable to some other value
      // It will force the promise to reject
      sinon.stub(newRelicService, 'newrelicSite').value('');

      return newRelicService.getLoadTime().catch((error) => {
        expect(error).toBeInstanceOf(Error);
      });
    });
  });

  describe('#getUniqueSessions', () => {
    let newRelicService = null;
    let result = null;

    beforeEach(() => {
      newRelicService = new NewRelicService(validConfig);
      result = {
        previous: { results: [{ count: 10 }] },
        current: { results: [{ count: 12 }] },
      };

      const getQueryResponseStub = sinon.stub(newRelicService, 'getQueryResponse');
      const query = newRelicService.buildUniqueSessionsQuery();

      getQueryResponseStub.callsFake((nrql) => {
        return new Promise((resolve, reject) => {
          // Resolve to result if the query string is correct
          if (nrql === query) {
            resolve(result);
          } else {
            reject();
          }
        });
      });
    });

    it('fetches unique sessions resolve', () => {
      return newRelicService.getUniqueSessions().then((response) => {
        expect(response).toEqual(expect.objectContaining({ previous: 10, current: 12 }));
      });
    });

    it('fetch unique sessions reject', () => {
      // Change newrelicSite variable to some other value
      // It will force the promise to reject
      sinon.stub(newRelicService, 'newrelicSite').value('');

      return newRelicService.getUniqueSessions().catch((error) => {
        expect(error).toBeInstanceOf(Error);
      });
    });
  });

  describe('#getSuccessfulBookings', () => {
    let newRelicService = null;
    let result = null;

    beforeEach(() => {
      newRelicService = new NewRelicService(validConfig);
      result = {
        previous: { results: [{ count: 10 }] },
        current: { results: [{ count: 12 }] },
      };

      const getQueryResponseStub = sinon.stub(newRelicService, 'getQueryResponse');
      const query = newRelicService.buildSuccessfulBookingsQuery();

      getQueryResponseStub.callsFake((nrql) => {
        return new Promise((resolve, reject) => {
          // Resolve to result if the query string is correct
          if (nrql === query) {
            resolve(result);
          } else {
            reject();
          }
        });
      });
    });

    it('fetches successful bookings resolve', () => {
      return newRelicService.getSuccessfulBookings().then((response) => {
        expect(response).toEqual(expect.objectContaining({ previous: 10, current: 12 }));
      });
    });

    it('fetch successful bookings reject', () => {
      // Change newrelicSite variable to some other value
      // It will force the promise to reject
      sinon.stub(newRelicService, 'newrelicSite').value('');

      return newRelicService.getSuccessfulBookings().catch((error) => {
        expect(error).toBeInstanceOf(Error);
      });
    });
  });

  describe('#getCLIErrors', () => {
    let newRelicService = null;
    let result = null;

    beforeEach(() => {
      newRelicService = new NewRelicService(validConfig);
      result = {
        results: [{ count: 10 }],
      };

      const getQueryResponseStub = sinon.stub(newRelicService, 'getQueryResponse');
      const query = newRelicService.buildCliErrorsQuery();

      getQueryResponseStub.callsFake((nrql) => {
        return new Promise((resolve, reject) => {
          // Resolve to result if the query string is correct
          if (nrql === query) {
            resolve(result);
          } else {
            reject();
          }
        });
      });
    });

    it('fetches cli errors resolve', () => {
      return newRelicService.getCLIErrors().then((response) => {
        expect(response).toEqual(expect.objectContaining({ current: 10 }));
        expect(new Date(response.updated)).not.toBe(constants.testing.invalidDateString);
      });
    });

    it('fetch cli errors reject', () => {
      // Change newrelicSite variable to some other value
      // It will force the promise to reject
      sinon.stub(newRelicService, 'newrelicCliSite').value('');

      return newRelicService.getCLIErrors().catch((error) => {
        expect(error).toBeInstanceOf(Error);
      });
    });
  });

  describe('#getErrorBreakdown', () => {
    let newRelicService = null;
    let result = null;

    beforeEach(() => {
      newRelicService = new NewRelicService(validConfig);
      result = {
        facets: [
          {
            name: 'A',
            results: [{ count: 10 }],
          },
          {
            name: 'B',
            results: [{ count: 20 }],
          },
        ],
      };

      const getQueryResponseStub = sinon.stub(newRelicService, 'getQueryResponse');
      const query = newRelicService.buildErrorBreakdownQuery();

      getQueryResponseStub.callsFake((nrql) => {
        return new Promise((resolve, reject) => {
          // Resolve to result if the query string is correct
          if (nrql === query) {
            resolve(result);
          } else {
            reject();
          }
        });
      });
    });

    it('fetches error breakdown resolve', () => {
      return newRelicService.getErrorBreakdown().then((response) => {
        const expectedResult = {
          results: [
            { name: 'A', count: 10 },
            { name: 'B', count: 20 },
          ],
        };
        expect(response).toEqual(expect.objectContaining(expectedResult));
        expect(new Date(response.updated)).not.toBe(constants.testing.invalidDateString);
      });
    });

    it('fetch error breakdown reject', () => {
      // Change newrelicSite variable to some other value
      // It will force the promise to reject
      sinon.stub(newRelicService, 'newrelicSite').value('');

      return newRelicService.getErrorBreakdown().catch((error) => {
        expect(error).toBeInstanceOf(Error);
      });
    });
  });

  describe('#getWebsiteFunnel', () => {
    let newRelicService = null;
    let result = null;

    beforeEach(() => {
      newRelicService = new NewRelicService(validConfig);
      result = {
        results: [
          {
            steps: [
              100,
              20,
              1,
            ],
          },
        ],
        metadata: {
          contents: [
            {
              steps: [
                'A',
                'B',
                'C',
              ],
            },
          ],
        },
      };

      const getQueryResponseStub = sinon.stub(newRelicService, 'getQueryResponse');
      const query = newRelicService.buildWebsiteFunnelQuery();

      getQueryResponseStub.callsFake((nrql) => {
        return new Promise((resolve, reject) => {
          // Resolve to result if the query string is correct
          if (nrql === query) {
            resolve(result);
          } else {
            reject();
          }
        });
      });
    });

    it('fetches error breakdown resolve', () => {
      return newRelicService.getWebsiteFunnel().then((response) => {
        const expectedResult = {
          results: [
            { name: 'A', count: 100 },
            { name: 'B', count: 20 },
            { name: 'C', count: 1 },
          ],
        };
        expect(response).toEqual(expect.objectContaining(expectedResult));
        expect(new Date(response.updated)).not.toBe(constants.testing.invalidDateString);
      });
    });

    it('fetch error breakdown reject', () => {
      // Change newrelicSite variable to some other value
      // It will force the promise to reject
      sinon.stub(newRelicService, 'buildWebsiteFunnelQuery').returns('');

      return newRelicService.getWebsiteFunnel().catch((error) => {
        expect(error).toBeInstanceOf(Error);
      });
    });
  });
});
