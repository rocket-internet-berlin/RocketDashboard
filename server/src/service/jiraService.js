import JiraApi from 'jira-client';
import validateSchema from '../helper/validator';

class JiraService {

  constructor(config) {
    JiraService.validateConfig(config);

    const { host, username, password } = config;
    this.jira = new JiraApi({
      protocol: 'https',
      host,
      username,
      password,
      apiVersion: '2',
      strictSSL: true,
    });
  }

  static validateConfig(config) {
    const schema = {
      required: [
        'host',
        'username',
        'password',
      ],
    };
    if (!validateSchema(schema, config)) {
      throw new Error('Invalid configuration properties');
    }
  }

  fetchInProgress() {
    return this.jira.searchJira('project = INTCAT AND type != Epic AND status in ("In Progress", "In Development")')
      .then(response => ({
        current: response.total,
      }));
  }

  fetchSelectedForDevelopment() {
    return this.jira.searchJira('project = INTCAT AND type != Epic AND status in ("Selected for Development")')
      .then(response => ({
        current: response.total,
      }));
  }

  fetchReadyForQA() {
    return this.jira.searchJira('project = INTCAT AND type != Epic AND status in ("Ready for QA", "Ready for QA (Stage)", "Ready for QA (Testsystem)")')
      .then(response => ({
        current: response.total,
        description: '(incl. Stage, Testsystem)',
      }));
  }
}

export default JiraService;
