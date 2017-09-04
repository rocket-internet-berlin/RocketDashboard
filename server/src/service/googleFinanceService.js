import axios from 'axios';
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
        let stockData = null;
        try {
          stockData = JSON.parse(payload.data.replace('//', ''))[0];
        } catch (e) {
          return {};
        }

        if (!('l_fix' in stockData)) {
          return {}; // Could not find the current stock price in the response
        }

        return ({
          current: parseFloat(stockData.l_fix).toFixed(2),
          change: parseFloat(stockData.c_fix).toFixed(2),
          previous: parseFloat(stockData.l_fix - stockData.c_fix).toFixed(2),
          updated: new Date(),
          heading: this.company,
        });
      });
  }

  buildStockPriceFetchUrl() {
    return `http://www.google.com/finance/info?q=${this.stockTicker}`;
  }
}

export default GoogleFinanceService;
