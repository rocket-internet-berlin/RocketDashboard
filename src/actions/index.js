import { refresh as refreshBreakdown } from '../widgets/Breakdown/actions/breakdown';
import { refresh as refreshNewRelicWebsiteFunnel } from '../widgets/NewRelicWebsiteFunnel/actions/newRelicWebsiteFunnel';
import { refresh as refreshBugsHistory } from '../widgets/BugsHistory/actions/bugsHistory';
// import { refresh as refreshJiraIssues } from '../widgets/JiraIssues/actions/jiraIssues';
import { refreshNumber } from '../widgets/Number/actions/number';
import dataSources from '../dataSources/dataSources';

// TODO: Possibly refactor using Observers pattern. This way we won`t have to add widgets here manually.
const refreshAll = () => dispatch => {
  dispatch(refreshBreakdown());
  dispatch(refreshNewRelicWebsiteFunnel());
  dispatch(refreshBugsHistory());
  // dispatch(refreshJiraIssues());   // TODO: uncomment once we have access to Jira
  dispatch(dataSources.forEach(widget => dispatch(refreshNumber(widget))));
};

export { refreshAll }; // eslint-disable-line import/prefer-default-export
