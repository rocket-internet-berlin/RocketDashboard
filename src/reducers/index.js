import { combineReducers } from 'redux';
import weekNumber from './weekNumber';
import bugsDiff from './bugsDiff';

const appReducers = combineReducers({
  weekNumber,
  bugsDiff,
});

export default appReducers;
