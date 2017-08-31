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
    return axios.get(`http://www.google.com/finance/info?q=${this.stockTicker}`)
      .then(payload => {
        const stockData = JSON.parse(payload.data.replace('//', ''))[0];
        return ({
          current: stockData.l_fix,
          change: parseFloat(stockData.c_fix),
          previous: parseFloat(stockData.l_fix - stockData.c_fix),
          updated: new Date(),
          heading: this.company,
        });
      });
  }
}

export default GoogleFinanceService;
