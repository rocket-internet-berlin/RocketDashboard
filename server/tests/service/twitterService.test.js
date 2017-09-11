/* eslint-disable no-unused-vars */
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import cheerio from 'cheerio';
import trim from 'lodash/trim';

import TwitterService from '../../src/service/twitterService';

describe('TwitterService', () => {
  const validConfig = { query: 'Twitter' };
  const responseMock = `
    <div id="timeline">
      <div id="stream-items-id">
        <div>
          <div class="tweet-text">
            <div class="wrapper">
              <span>Some tweet</span>
              <a href="/profile">@Profile</a>
              <a href="/hashtag/twitter">#Twitter</a>
              <a href="http://random.url">Random</a>
            </div>
          </div>
          <div>
            This div should not be parsed.
          </div>
        </div>
      </div>
    </div>
  `;
  const validResponse = `
    <div class="wrapper">
      <span>Some tweet</span>
      <a href="https://twitter.com/profile" target="_blank">@Profile</a>
      <a href="https://twitter.com/hashtag/twitter" target="_blank">#Twitter</a>
    </div>
  `;

  describe('#constructor - Config schema validation', () => {
    it('Should not throw any error when passed a valid config', () => {
      expect(() => {
        const twitterService = new TwitterService(validConfig);
      }).not.toThrow();
    });

    it('Should throw error when passed an invalid config', () => {
      const incompleteConfig = {}; // query is required, should throw error

      expect(() => {
        const twitterService = new TwitterService(incompleteConfig);
      }).toThrow();
    });
  });

  describe('#getLatestTweetForHashtag', () => {
    let twitterService = null;
    let axiosMock = null;

    beforeEach(() => {
      twitterService = new TwitterService(validConfig);
      axiosMock = new MockAdapter(axios);
    });

    it('returns correct response', () => {
      const tweetUrl = twitterService.getTweetsUrl(validConfig.query);
      axiosMock.onGet(tweetUrl).reply(200, responseMock);
      return twitterService.getLatestTweetForHashtag().then((response) => {
        expect(response).toHaveProperty('body');
        expect(response).toHaveProperty('heading');
        expect(response).toHaveProperty('updated');

        const $ = cheerio.load(response.body);
        expect($('.wrapper').find('span')).toHaveLength(1);
        expect($('.wrapper').find('a')).toHaveLength(3);
        expect($('.wrapper').find('a').eq(0).attr('target')).toEqual('_blank');
        expect($('.wrapper').find('a').eq(0).attr('href')).toMatch('https://twitter.com/profile');
        expect($('.wrapper').find('a').eq(1).attr('href')).toMatch('https://twitter.com/hashtag/twitter');
        expect($('.wrapper').find('a').eq(2).attr('href')).toMatch('http://random.url');
      });
    });

    it('returns empty string if html is not valid', () => {
      const invalidResponse = `
        <div id="timeline">
          <div>
            <div class="tweet-text">
              <div class="wrapper">
                <span>Some tweet</span>
                <a href="/profile">@Profile</a>
                <a href="/hashtag/twitter">#Twitter</a>
              </div>
            </div>
            <div>
              This div should not be parsed.
            </div>
          </div>
        </div>
      `;
      const tweetUrl = twitterService.getTweetsUrl(validConfig.query);
      axiosMock.onGet(tweetUrl).reply(200, invalidResponse);

      return twitterService.getLatestTweetForHashtag().then((response) => {
        expect(response).toHaveProperty('body');
        expect(response).toHaveProperty('heading');
        expect(response).toHaveProperty('updated');
        expect(response.body).toBeFalsy();
      });
    });
  });
});
