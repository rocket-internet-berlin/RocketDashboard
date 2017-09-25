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

    this.statusCategory = {
      inProgress: ['In Progress', 'In Development'],
      selectedForDev: ['Selected for Development'],
      readyForQA: ['Ready for QA', 'Ready for QA (Stage)', 'Ready for QA (Testsystem)'],
    };
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

  static buildSearchQuery(statusCategory) {
    let baseQuery = 'project = INTCAT AND type != Epic AND status in (';

    statusCategory.forEach((category, index, categoryArray) => {
      baseQuery += `"${category}"`;

      if (index < categoryArray.length - 1) {
        baseQuery += ',';
      }
    });

    baseQuery += ')';
    return baseQuery;
  }

  fetchInProgress() {
    return this.jira.searchJira(JiraService.buildSearchQuery(this.statusCategory.inProgress))
      .then(response => ({
        current: response.total,
        updated: new Date(),
      }));
  }

  fetchSelectedForDevelopment() {
    return this.jira.searchJira(JiraService.buildSearchQuery(this.statusCategory.selectedForDev))
      .then(response => ({
        current: response.total,
        updated: new Date(),
      }));
  }

  fetchReadyForQA() {
    return this.jira.searchJira(JiraService.buildSearchQuery(this.statusCategory.readyForQA))
      .then(response => ({
        current: response.total,
        description: '(incl. Stage, Testsystem)',
        updated: new Date(),
      }));
  }

  getSummary() {
    const statusCategory = this.statusCategory.inProgress.concat(this.statusCategory.selectedForDev, this.statusCategory.readyForQA);

    return this.jira.searchJira(JiraService.buildSearchQuery(statusCategory))
    .then(response => ({
      results: JiraService.getCountGroupedByIssueStatus(response),
      updated: new Date(),
    }));
  }

  static getCountGroupedByIssueStatus(apiResponse) {
    const results = [];
    const inProgress = { name: 'In Progress', value: 0 };
    const selectedForDevelopment = { name: 'Selected for Development', value: 0 };
    const readyForQA = { name: 'Ready for QA', value: 0 };

    apiResponse.issues.forEach((issue) => {
      switch (issue.fields.status.name) {
        case 'In Progress':
        case 'In Development':
          inProgress.value += 1;
          break;
        case 'Selected for Development':
          selectedForDevelopment.value += 1;
          break;
        case 'Ready for QA':
        case 'Ready for QA (Stage)':
        case 'Ready for QA (Testsystem)':
          readyForQA.value += 1;
          break;
        default:
          break;
      }
    });

    results.push(inProgress);
    results.push(selectedForDevelopment);
    results.push(readyForQA);

    return results;
  }
}

export default JiraService;
