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
});
