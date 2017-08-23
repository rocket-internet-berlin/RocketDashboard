import { combineReducers } from 'redux';
import finance from '../widgets/Finance/reducers/finance';
import weather from '../widgets/Weather/reducers/weather';
import bugsHistory from '../widgets/BugsHistory/reducers/bugsHistory';
import generic from './generic/generic';
import widgetList from '../containers/WidgetList/reducers/widgetList';

const appReducers = combineReducers({
  bugsHistory,
  generic,
  finance,
  weather,
  widgetList,
});

export default appReducers;
