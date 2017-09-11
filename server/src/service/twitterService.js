import axios from 'axios';
import cheerio from 'cheerio';

import validateSchema from '../../src/helper/validator';

class TwitterService {
  constructor(config) {
    TwitterService.validateConfig(config);

    this.query = config.query;
    this.baseUrl = 'https://twitter.com';
  }

  static validateConfig(config) {
    const schema = {
      required: [
        'query',
      ],
    };
    if (!validateSchema(schema, config)) {
      throw new Error('Invalid configuration properties');
    }
  }

  getLatestTweetForHashtag() {
    const me = this;

    return axios.get(this.getTweetsUrl(this.query))
      .then((resp) => {
        const content = me.parseTweets(resp.data);

        return {
          body: content,
          heading: `Tweets for ${me.query}`,
          updated: new Date(),
        };
      });
  }

  parseTweets(html) {
    const baseUrl = this.baseUrl;
    const $ = cheerio.load(html);
    const $tweet = $('#timeline').find('#stream-items-id').children().first();
    const $tweetContent = $tweet.find('.tweet-text');

    $tweetContent.find('a').map((index, elem) => {
      const href = $(elem).attr('href');

      // Prepend baseUrl if href is a relative url
      if (href[0] === '/') {
        const absoluteHref = `${baseUrl}${href}`;
        $(elem).attr('href', absoluteHref);
      }

      $(elem).attr('target', '_blank');
      return $(elem);
    });

    return $tweetContent.html();
  }

  getTweetsUrl(query) {
    return `${this.baseUrl}/${query}?f=tweets`;
  }
}

export default TwitterService;
