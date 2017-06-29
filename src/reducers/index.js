import { combineReducers } from 'redux';
import weekNumber from '../widgets/WeekNumber/reducers/weekNumber';
import newRelicErrors from '../widgets/NewRelicErrors/reducers/newRelicErrors';
import bugsHistory from '../widgets/BugsHistory/reducers/bugsHistory';

const appReducers = combineReducers({
  weekNumber,
  newRelicErrors,
  bugsHistory,
});

export default appReducers;
