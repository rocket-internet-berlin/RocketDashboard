import { combineReducers } from 'redux';
import bugsHistory from '../widgets/BugsHistory/reducers/bugsHistory';
import jiraIssues from '../widgets/JiraIssues/reducers/jiraIssues';
import breakdown from '../widgets/Breakdown/reducers/breakdown';
import newRelicWebsiteFunnel from '../widgets/NewRelicWebsiteFunnel/reducers/newRelicWebsiteFunnel';
import number from '../widgets/Number/reducers/number';

const appReducers = combineReducers({
  number,
  bugsHistory,
  jiraIssues,
  breakdown,
  newRelicWebsiteFunnel,
});

export default appReducers;
