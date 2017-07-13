import { combineReducers } from 'redux';
import bugsHistory from '../widgets/BugsHistory/reducers/bugsHistory';
import jiraIssues from '../widgets/JiraIssues/reducers/jiraIssues';
import newRelicErrorBreakdown from '../widgets/NewRelicErrorBreakdown/reducers/newRelicErrorBreakdown';
import newRelicWebsiteFunnel from '../widgets/NewRelicWebsiteFunnel/reducers/newRelicWebsiteFunnel';
import number from '../widgets/Number/reducers/number';

const appReducers = combineReducers({
  number,
  bugsHistory,
  jiraIssues,
  newRelicErrorBreakdown,
  newRelicWebsiteFunnel,
});

export default appReducers;
