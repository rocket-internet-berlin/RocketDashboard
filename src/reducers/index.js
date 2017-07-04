import { combineReducers } from 'redux';
import weekNumber from '../widgets/WeekNumber/reducers/weekNumber';
import newRelicErrors from '../widgets/NewRelicErrors/reducers/newRelicErrors';
import newRelicLoadTime from '../widgets/NewRelicLoadTime/reducers/newRelicLoadTime';
import bugsHistory from '../widgets/BugsHistory/reducers/bugsHistory';
import jiraIssues from '../widgets/JiraIssues/reducers/jiraIssues';

const appReducers = combineReducers({
  weekNumber,
  newRelicErrors,
  newRelicLoadTime,
  bugsHistory,
  jiraIssues,
});

export default appReducers;
