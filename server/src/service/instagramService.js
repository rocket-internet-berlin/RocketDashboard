import axios from 'axios';
import { random } from 'lodash';
import validateSchema from '../helper/validator';

class InstagramService {
  static validateConfig(config) {
    const schema = {
      required: [
        'key',
        'value',
        'token',
      ],
    };
    if (!validateSchema(schema, config)) {
      throw new Error('Invalid configuration properties');
    }
  }

  constructor(config) {
    InstagramService.validateConfig(config);

    this.key = config.key;
    this.value = config.value;
    this.token = config.token;
  }

  fetchInstagramInfo() {
    return axios.get(this.buildLocationUrl())
      .then((payload) => {
        this.instagramData = payload.data.data;
        return this.getRandomElement();
      });
  }

  buildLocationUrl() {
    return `https://api.instagram.com/v1/${this.key}/${this.value}/media/recent?access_token=${this.token}&count=100`;
  }

  getRandomElement() {
    const randomElement = this.instagramData[random(0, this.instagramData.length)];
    return {
      username: randomElement.user.username,
      thumbnail: randomElement.images.thumbnail.url,
      standardResolution: randomElement.images.standard_resolution.url,
      updated: new Date(),
    };
  }
}

export default InstagramService;
