import { combineReducers } from 'redux';
import bugsHistory from '../widgets/BugsHistory/reducers/bugsHistory';
import generic from './generic/generic';

const appReducers = combineReducers({
  bugsHistory,
  generic,
});

export default appReducers;
