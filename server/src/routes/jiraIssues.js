import express from 'express';
import JiraApi from 'jira-client';
import config from '../config';

const jira = new JiraApi({
  protocol: 'https',
  host: config.jira.host,
  username: config.jira.username,
  password: config.jira.password,
  apiVersion: '2',
  strictSSL: true,
});

const router = express.Router();

router.get('/', (req, res, next) => {
  jira.searchJira("project = CC AND status in (Open, 'In Progress', Reopened)")
    .then(response => {
      const issues = response.issues;
      let blockers = 0;
      let criticals = 0;
      let others = 0;

      issues.forEach(issue => {
        const priority = issue.fields.priority.name;
        if (priority === 'Blocker') {
          blockers += 1;
        } else if (priority === 'Critical') {
          criticals += 1;
        } else {
          others += 1;
        }
      });

      res.json({
        status: 'success',
        message: '',
        data: { blockers, criticals, others },
      });
    })
    .catch(error => {
      console.error(`error123: ${error}`);
      next(error);
    });
});

export default router;
