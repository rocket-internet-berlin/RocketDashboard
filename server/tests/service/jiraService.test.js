/* eslint-disable prefer-arrow-callback,func-names,no-unused-vars */
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';

import JiraService from '../../src/service/jiraService';

// Initialize sinon-stub-promise
sinonStubPromise(sinon);

describe('JiraService', () => {
  const validConfig = { host: 'someJiraServer', username: 'username', password: 'password' };

  describe('#constructor - Config schema validation', () => {
    it('Should not throw any error when passed a valid config', () => {
      expect(() => {
        const jiraService = new JiraService(validConfig);
      }).not.toThrow();
    });

    it('Should throw error when passed an invalid config', () => {
      const incompleteConfig = { host: 'someJiraServer' }; // username and password keys not present, should throw error

      expect(() => {
        const jiraService = new JiraService(incompleteConfig);
      }).toThrow();
    });
  });

  describe('#fetchInProgress', () => {
    it('Should return valid data', () => {
      const jiraService = new JiraService(validConfig);
      const fakeResponseFromJira = { total: 99 };

      sinon.stub(jiraService.jira, 'searchJira').returnsPromise();
      jiraService.jira.searchJira.resolves(fakeResponseFromJira);

      return jiraService.fetchInProgress()
        .then(result => {
          expect(jiraService.jira.searchJira.calledOnce).toBe(true);
          expect('current' in result).toBe(true);
          expect(result.current).toBe(fakeResponseFromJira.total);
          expect('updated' in result).toBe(true);
          expect(new Date(result.updated)).not.toBe('Invalid date');
        });
    });
  });

  describe('#fetchSelectedForDevelopment', () => {
    it('Should return valid data', () => {
      const jiraService = new JiraService(validConfig);
      const fakeResponseFromJira = { total: 99 };

      sinon.stub(jiraService.jira, 'searchJira').returnsPromise();
      jiraService.jira.searchJira.resolves(fakeResponseFromJira);

      return jiraService.fetchSelectedForDevelopment()
        .then(result => {
          expect(jiraService.jira.searchJira.calledOnce).toBe(true);
          expect('current' in result).toBe(true);
          expect(result.current).toBe(fakeResponseFromJira.total);
          expect('updated' in result).toBe(true);
          expect(new Date(result.updated)).not.toBe('Invalid date');
        });
    });
  });

  describe('#fetchReadyForQA', () => {
    it('Should return valid data', () => {
      const jiraService = new JiraService(validConfig);
      const fakeResponseFromJira = { total: 99 };

      sinon.stub(jiraService.jira, 'searchJira').returnsPromise();
      jiraService.jira.searchJira.resolves(fakeResponseFromJira);

      return jiraService.fetchReadyForQA()
        .then(result => {
          expect(jiraService.jira.searchJira.calledOnce).toBe(true);
          expect('current' in result).toBe(true);
          expect(result.current).toBe(fakeResponseFromJira.total);
          expect('description' in result).toBe(true);
          expect(typeof result.description).toBe('string');
          expect(result.description).not.toBeFalsy(); // Check if non-empty string
          expect('updated' in result).toBe(true);
          expect(new Date(result.updated)).not.toBe('Invalid date');
        });
    });
  });

  describe('#getSummary', () => {
    it('Should return valid data', () => {
      const jiraService = new JiraService(validConfig);
      const fakeResponseFromJira = {
        total: 24,
        issues: [{
          id: '432564',
          fields: {
            status: { name: 'In Progress' },
          },
        }, {
          id: '432138',
          fields: {
            status: { name: 'In Development' },
          },
        }, {
          id: '432126',
          fields: {
            status: { name: 'Selected for Development' },
          },
        }, {
          id: '431930',
          fields: {
            status: { name: 'Ready for QA' },
          },
        }, {
          id: '431809',
          fields: {
            status: { name: 'Ready for QA (Stage)' },
          },
        }, {
          id: '431734',
          fields: {
            status: { name: 'Ready for QA (Testsystem)' },
          },
        }],
      };

      const expectedResult = [
        { name: 'In Progress', value: 2 },
        { name: 'Selected for Development', value: 1 },
        { name: 'Ready for QA', value: 3 },
      ];

      sinon.stub(jiraService.jira, 'searchJira').returnsPromise();
      jiraService.jira.searchJira.resolves(fakeResponseFromJira);

      return jiraService.getSummary()
        .then(response => {
          expect(jiraService.jira.searchJira.calledOnce).toBe(true);
          expect('results' in response).toBe(true);
          expect(response.results).toEqual(expectedResult);
          expect('updated' in response).toBe(true);
          expect(new Date(response.updated)).not.toBe('Invalid date');
        });
    });
  });

  describe('##getCountGroupedByIssueStatus', () => {
    it('calculates issue count correctly', () => {
      const fakeResponseFromJira = {
        total: 24,
        issues: [{
          id: '432564',
          fields: {
            status: { name: 'In Progress' },
          },
        }, {
          id: '432138',
          fields: {
            status: { name: 'InDevelopment' },
          },
        }],
      };

      const result = JiraService.getCountGroupedByIssueStatus(fakeResponseFromJira);
      expect(result).toHaveLength(3);
      expect(result).toEqual(expect.arrayContaining([{ name: 'In Progress', value: 1 }]));
      expect(result).toEqual(expect.arrayContaining([{ name: 'Selected for Development', value: 0 }]));
      expect(result).toEqual(expect.arrayContaining([{ name: 'Ready for QA', value: 0 }]));
      expect(result).not.toEqual(expect.arrayContaining([{ name: 'InDevelopment', value: 0 }]));
    });
  });
});
