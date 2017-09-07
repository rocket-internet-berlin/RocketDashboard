import axios from 'axios';
import isDate from 'lodash/isDate';

import validateSchema from '../helper/validator';

class TriviaService {
  static validateConfig(config) {
    const schema = {
      required: [
        'baseUrl',
      ],
    };
    if (!validateSchema(schema, config)) {
      throw new Error('Invalid configuration properties');
    }
  }

  constructor(config) {
    TriviaService.validateConfig(config);
    this.baseUrl = config.baseUrl;
  }

  getTodaysTrivia() {
    const today = new Date();

    return axios.get(this.buildTriviaUrl(today)).then(response => ({
      body: response.data,
      updated: today,
    }));
  }

  buildTriviaUrl(today) {
    const triviaDate = isDate(today) ? today : new Date();
    const month = triviaDate.getMonth() + 1;
    const date = triviaDate.getDate();

    return `${this.baseUrl}/${month}/${date}/date`;
  }
}

export default TriviaService;
