import JiraApi from 'jira-client';

class JiraService {

  constructor(host, username, password) {
    this.jira = new JiraApi({
      protocol: 'https',
      host,
      username,
      password,
      apiVersion: '2',
      strictSSL: true,
    });
  }

  fetchStatus(callback) {
    this.jira.searchJira("project = CC AND status in ('Selected for Development', 'In Progress', 'Waiting Approval')")
      .then(response => {
        const issues = response.issues;
        const blockers = issues.filter(issue => issue.fields.priority.name === 'Blocker').length;
        const criticals = issues.filter(issue => issue.fields.priority.name === 'Critical').length;
        const others = issues.length - blockers - criticals;
        callback(null, { blockers, criticals, others });
      })
      .catch(error => {
        callback(error);
      });
  }
}

export default JiraService;
