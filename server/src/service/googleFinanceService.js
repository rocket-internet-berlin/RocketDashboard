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
  }

  fetchStockPrice() {
    return axios.get(`http://www.google.com/finance/info?q=${this.stockTicker}`);
  }
}

export default GoogleFinanceService;
