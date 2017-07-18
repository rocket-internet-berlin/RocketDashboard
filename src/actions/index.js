import { refresh as refreshNewRelicErrorBreakdown } from '../widgets/NewRelicErrorBreakdown/actions/newRelicErrorBreakdown';
import { refresh as refreshNewRelicWebsiteFunnel } from '../widgets/NewRelicWebsiteFunnel/actions/newRelicWebsiteFunnel';
import { refresh as refreshBugsHistory } from '../widgets/BugsHistory/actions/bugsHistory';
// import { refresh as refreshJiraIssues } from '../widgets/JiraIssues/actions/jiraIssues';
import { refreshNumber } from '../widgets/Number/actions/number';
import customWidgets from '../customDataSources/customDataSources';

// TODO: Possibly refactor using Observers pattern. This way we won`t have to add widgets here manually.
const refreshAll = () => dispatch => {
  dispatch(refreshNewRelicErrorBreakdown());
  dispatch(refreshNewRelicWebsiteFunnel());
  dispatch(refreshBugsHistory());
  // dispatch(refreshJiraIssues());   // TODO: uncomment once we have access to Jira
  dispatch(customWidgets.forEach(widget => dispatch(refreshNumber(widget))));
};

export { refreshAll }; // eslint-disable-line import/prefer-default-export
