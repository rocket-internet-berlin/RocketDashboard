import { combineReducers } from 'redux';
import weekNumber from './weekNumber/weekNumber';
import newRelicErrors from './newRelicErrors/newRelicErrors';
import bugsHistory from './bugsHistory/bugsHistory';
import jiraIssues from './jiraIssues/jiraIssues';

const appReducers = combineReducers({
  weekNumber,
  newRelicErrors,
  bugsHistory,
  jiraIssues,
});

export default appReducers;
