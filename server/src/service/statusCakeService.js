import forEach from 'lodash/forEach';
import moment from 'moment';
import axios from 'axios';

import createDateRange from '../helper/dateHelper';
import validateSchema from '../helper/validator';

class StatusCakeService {
  static validateConfig(config) {
    const schema = {
      required: [
        'apiUrl',
        'apiKey',
        'username',
        'testId',
      ],
    };
    if (!validateSchema(schema, config)) {
      throw new Error('Invalid configuration properties');
    }
  }

  constructor(config) {
    StatusCakeService.validateConfig(config);
    this.apiUrl = config.apiUrl;
    this.apiKey = config.apiKey;
    this.username = config.username;
    this.testId = config.testId;

    this.endDate = moment();
    const historyPeriod = config.period ? moment.duration(config.period) : moment.duration('P1D');
    this.startDate = moment().subtract(historyPeriod);
    this.timeInterval = config.interval ? moment.duration(config.interval) : moment.duration('PT5M');
  }

  getHistory() {
    const me = this;

    return new Promise((resolve, reject) => {
      axios.get(this.apiUrl, {
        params: {
          TestID: this.testId,
        },
        headers: {
          API: this.apiKey,
          Username: this.username,
        },
      })
      .then((response) => {
        if (response.data.Error) {
          return reject(response.data.Error);
        }

        const returnData = {
          history: me.convertToGraph(response.data),
          updated: new Date(),
        };
        return resolve(returnData);
      });
    });
  }

  convertToGraph(json) {
    const dataPoints = [];
    const dateRange = createDateRange(this.startDate, this.endDate, this.timeInterval);

    forEach(dateRange, (date) => {
      forEach(json, (value) => {  // eslint-disable-line
        const startDate = moment(value.Start);
        const endDate = moment(value.End);

        if (date.isBetween(startDate, endDate)) {
          dataPoints.push({
            date: date.format('HH:mm'),
            status: value.Status === 'Up' ? 1 : 0,
          });

          return false;
        }
      });
    });

    return dataPoints;
  }
}

export default StatusCakeService;
