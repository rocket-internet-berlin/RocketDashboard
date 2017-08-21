import axios from 'axios';
import validateSchema from '../helper/validator';

class FinanceService {
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
    FinanceService.validateConfig(config);

    this.stockTicker = config.stockTicker;
  }

  fetchStockPrice() {
    return axios.get(`http://www.google.com/finance/info?q=${this.stockTicker}`);
  }
}

export default FinanceService;
