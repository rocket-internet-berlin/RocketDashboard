import { refresh as refreshWeekNumber } from '../widgets/WeekNumber/actions/weekNumber';
import { refresh as refreshNewRelicErrors } from '../widgets/NewRelicErrors/actions/newRelicErrors';
import { refresh as refreshBugsHistory } from '../widgets/BugsHistory/actions/bugsHistory';

import { refresh as refreshJiraIssues } from '../widgets/JiraIssues/actions/jiraIssues';

// TODO: Possibly refactor using Observers pattern. This way we won`t have to add widgets here manually.
const refreshAll = () => dispatch => {
  dispatch(refreshWeekNumber());
  dispatch(refreshNewRelicErrors());
  dispatch(refreshBugsHistory());
  dispatch(refreshJiraIssues());
};

export { refreshAll }; // eslint-disable-line import/prefer-default-export
