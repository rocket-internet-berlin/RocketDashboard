import axios from 'axios';
import cheerio from 'cheerio';
import validateSchema from '../helper/validator';

class GoogleFinanceService {
  static validateConfig(config) {
    const schema = {
      required: [
        'stockTicker',
      ],
    };
    if (!validateSchema(schema, config)) {
      throw new Error('Invalid configuration properties');
    }
  }

  constructor(config) {
    GoogleFinanceService.validateConfig(config);

    this.stockTicker = config.stockTicker;
    this.company = config.company;
  }

  fetchStockPrice() {
    return axios.get(this.buildStockPriceFetchUrl())
      .then(payload => {
        const $ = cheerio.load(payload.data);
        const $current = $('#price-panel span.pr span').text();
        const $previous = $('.id-price-change span span').first().text();

        if (!$current || !$previous) {
          return {};
        }

        const current = parseFloat($current);
        const change = parseFloat($previous);
        const previous = current - change;

        return ({
          current,
          change,
          previous,
          updated: new Date(),
          heading: this.company,
        });
      });
  }

  buildStockPriceFetchUrl() {
    return `https://www.google.com/finance?q=${this.stockTicker}`;
  }
}

export default GoogleFinanceService;
