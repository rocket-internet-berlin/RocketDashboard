/* eslint-disable no-unused-vars */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import constants from '../../src/config/constants';
import TriviaService from '../../src/service/triviaService';

describe('TriviaService', () => {
  const validConfig = { baseUrl: 'http://example.org' };

  describe('#constructor - config validation', () => {
    it('valid config, no exception', () => {
      expect(() => {
        const triviaService = new TriviaService(validConfig);
      }).not.toThrow();
    });
    it('throws exception on invalid config', () => {
      expect(() => {
        const triviaService = new TriviaService({});
      }).toThrow();
    });
  });

  describe('#buildTriviaUrl', () => {
    let triviaService = null;

    beforeEach(() => {
      triviaService = new TriviaService(validConfig);
    });

    it('builds correct url', () => {
      const today = new Date('2017-09-06');
      const url = triviaService.buildTriviaUrl(today);
      const expectedUrl = 'http://example.org/9/6/date';
      expect(url).toEqual(expectedUrl);
    });

    it('builds correct url with invalid input', () => {
      const today = new Date();
      const url = triviaService.buildTriviaUrl('invalid');
      const expectedUrl = triviaService.buildTriviaUrl(today);
      expect(url).toEqual(expectedUrl);
    });
  });

  describe('#getTodaysTrivia', () => {
    let triviaService = null;
    let axiosMock = null;
    const today = new Date();

    beforeEach(() => {
      triviaService = new TriviaService(validConfig);
      axiosMock = new MockAdapter(axios);
    });

    it('fetch trivia', () => {
      const expectedTrivia = 'I don\'t win at trivia. Trivia loses to me. ~Chuck';
      axiosMock.onGet(triviaService.buildTriviaUrl(today)).reply(200, expectedTrivia);

      triviaService.getTodaysTrivia().then((response) => {
        expect(response).toEqual(expect.objectContaining({
          body: expectedTrivia,
        }));

        expect(response).toHaveProperty('updated');
        expect(new Date(response.updated)).not.toBe(constants.testing.invalidDateString);
      });
    });
  });
});
