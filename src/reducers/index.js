import { combineReducers } from 'redux';
import weekNumber from './weekNumber';
import bugsDiff from './bugsDiff';
import bugsHistory from './bugsHistory';

const appReducers = combineReducers({
  weekNumber,
  bugsDiff,
  bugsHistory,
});

export default appReducers;
