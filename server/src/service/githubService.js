import axios from 'axios';
import validateSchema from '../helper/validator';

class GithubService {
  static validateConfig(config) {
    const schema = {
      required: [
        'user',
        'project',
        'authToken',
      ],
    };
    if (!validateSchema(schema, config)) {
      throw new Error('Invalid configuration properties');
    }
  }

  constructor(config) {
    GithubService.validateConfig(config);

    this.user = config.user;
    this.project = config.project;
    this.authToken = config.authToken;
  }

  fetchGitData() {
    const data = {
      headers: {
        Authorization: `token ${this.authToken}`,
      },
    };

    return axios.get(`https://api.github.com/repos/${this.user}/${this.project}/pulls?state=open`, data)
      .then((payload) => {
        const githubData = payload.data;
        return ({
          current: githubData.length,
          updated: new Date(),
        });
      }).catch(error => {
        throw new Error(error.message);
      });
  }
}

export default GithubService;
