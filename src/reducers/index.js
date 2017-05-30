import { combineReducers } from 'redux';
import weekNumber from './weekNumber/weekNumber';
import bugsDiff from './bugsDiff/bugsDiff';
import bugsHistory from './bugsHistory/bugsHistory';
import counter from './counter/counter';

const appReducers = combineReducers({
  weekNumber,
  bugsDiff,
  bugsHistory,
  counter,
});

export default appReducers;
