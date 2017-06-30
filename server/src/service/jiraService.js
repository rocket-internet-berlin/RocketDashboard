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
        let blockers = 0;
        let criticals = 0;

        issues.forEach(issue => {
          const priority = issue.fields.priority.name;
          if (priority === 'Blocker') {
            blockers += 1;
          } else if (priority === 'Critical') {
            criticals += 1;
          }
        });
        const others = issues.length - blockers - criticals;
        callback(null, { blockers, criticals, others });
      })
      .catch(error => {
        callback(error);
      });
  }
}

export default JiraService;
