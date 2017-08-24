import { combineReducers } from 'redux';
import finance from '../widgets/Finance/reducers/finance';
import weather from '../widgets/Weather/reducers/weather';
import bugsHistory from '../widgets/BugsHistory/reducers/bugsHistory';
import generic from './generic/generic';

const appReducers = combineReducers({
  bugsHistory,
  generic,
  finance,
  weather,
});

export default appReducers;
