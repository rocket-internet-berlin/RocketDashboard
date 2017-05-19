import { combineReducers } from 'redux';
import weekNumber from './weekNumber/weekNumber';
import bugsDiff from './bugsDiff/bugsDiff';
import bugsHistory from './bugsHistory/bugsHistory';

const appReducers = combineReducers({
  weekNumber,
  bugsDiff,
  bugsHistory,
});

export default appReducers;
