import refreshWeekNumber from '../widgets/WeekNumber/actions/weekNumber';
import refreshNewRelicErrors from '../widgets/NewRelicErrors/actions/newRelicErrors';
import refreshNewRelicLoadTime from '../widgets/NewRelicLoadTime/actions/newRelicLoadTime';
import refreshNewRelicUniqueSessions from '../widgets/NewRelicUniqueSessions/actions/newRelicUniqueSessions';
import refreshNewRelicSuccessfulBookings from '../widgets/NewRelicSuccessfulBookings/actions/newRelicSuccessfulBookings';
import refreshNewRelicCliErrors from '../widgets/NewRelicCliErrors/actions/newRelicCliErrors';
import { refresh as refreshBugsHistory } from '../widgets/BugsHistory/actions/bugsHistory';
import { refresh as refreshJiraIssues } from '../widgets/JiraIssues/actions/jiraIssues';

// TODO: Possibly refactor using Observers pattern. This way we won`t have to add widgets here manually.
const refreshAll = () => dispatch => {
  dispatch(refreshWeekNumber());
  dispatch(refreshNewRelicErrors());
  dispatch(refreshNewRelicLoadTime());
  dispatch(refreshNewRelicUniqueSessions());
  dispatch(refreshNewRelicSuccessfulBookings());
  dispatch(refreshNewRelicCliErrors());
  dispatch(refreshBugsHistory());
  dispatch(refreshJiraIssues());
};

export { refreshAll }; // eslint-disable-line import/prefer-default-export
