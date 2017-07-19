import { combineReducers } from 'redux';
import bugsHistory from '../widgets/BugsHistory/reducers/bugsHistory';
import jiraIssues from '../widgets/JiraIssues/reducers/jiraIssues';
import breakdown from '../widgets/Breakdown/reducers/breakdown';
import funnel from '../widgets/Funnel/reducers/funnel';
import number from '../widgets/Number/reducers/number';
// import generic from './generic/generic';

const appReducers = combineReducers({
  number,
  bugsHistory,
  jiraIssues,
  breakdown,
  funnel,
  // generic,
});

export default appReducers;
