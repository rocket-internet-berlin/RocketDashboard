import { refreshNumber } from '../widgets/Number/actions/number';
import { refreshBreakdown } from '../widgets/Breakdown/actions/breakdown';
import { refreshFunnel } from '../widgets/Funnel/actions/funnel';
import { refresh as refreshBugsHistory } from '../widgets/BugsHistory/actions/bugsHistory';
// import { refresh as refreshJiraIssues } from '../widgets/JiraIssues/actions/jiraIssues';
import dataSources from '../dataSources/dataSources';

// TODO: Possibly refactor using Observers pattern. This way we won`t have to add widgets here manually.
const refreshAll = () => dispatch => {
  dispatch(refreshBugsHistory());
  // dispatch(refreshJiraIssues());   // TODO: uncomment once we have access to Jira

  dispatch(
    dataSources.forEach(widget => {
      if (widget.type === 'number') {
        dispatch(refreshNumber(widget));
      } else if (widget.type === 'breakdown') {
        console.log(widget);
        dispatch(refreshBreakdown(widget));
      } else if (widget.type === 'funnel') {
        dispatch(refreshFunnel(widget));
      }
    }),
  );
};

export { refreshAll }; // eslint-disable-line import/prefer-default-export
