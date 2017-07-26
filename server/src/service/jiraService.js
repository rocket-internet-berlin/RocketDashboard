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

  fetchStatus() {
    return this.jira.searchJira('project = INTCAT AND status in ("Selected for Development", "In Progress")')
      .then(response => {
        const issues = response.issues;
        const blockers = issues.filter(issue => issue.fields.priority.name === 'Blocker').length;
        const criticals = issues.filter(issue => issue.fields.priority.name === 'Critical').length;
        const others = issues.length - blockers - criticals;
        return { blockers, criticals, others };
      });
  }
}

export default JiraService;
