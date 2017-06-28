import { combineReducers } from 'redux';
import weekNumber from './weekNumber/weekNumber';
import newRelicErrors from '../widgets/NewRelicErrors/reducers/newRelicErrors';
import bugsHistory from './bugsHistory/bugsHistory';

const appReducers = combineReducers({
  weekNumber,
  newRelicErrors,
  bugsHistory,
});

export default appReducers;
