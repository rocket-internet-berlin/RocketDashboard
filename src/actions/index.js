import { refreshBreakdown } from '../widgets/Breakdown/actions/breakdown';
import { refresh as refreshNewRelicWebsiteFunnel } from '../widgets/NewRelicWebsiteFunnel/actions/newRelicWebsiteFunnel';
import { refresh as refreshBugsHistory } from '../widgets/BugsHistory/actions/bugsHistory';
// import { refresh as refreshJiraIssues } from '../widgets/JiraIssues/actions/jiraIssues';
import { refreshNumber } from '../widgets/Number/actions/number';
import dataSources from '../dataSources/dataSources';

// TODO: Possibly refactor using Observers pattern. This way we won`t have to add widgets here manually.
const refreshAll = () => dispatch => {
  dispatch(refreshNewRelicWebsiteFunnel());
  dispatch(refreshBugsHistory());
  // dispatch(refreshJiraIssues());   // TODO: uncomment once we have access to Jira

  dispatch(
    dataSources.forEach(widget => {
      if (widget.type === 'number') {
        dispatch(refreshNumber(widget));
      } else if (widget.type === 'breakdown') {
        console.log(widget);
        dispatch(refreshBreakdown(widget));
      }
    }),
  );
};

export { refreshAll }; // eslint-disable-line import/prefer-default-export
