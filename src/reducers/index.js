import { combineReducers } from 'redux';
import finance from './finance/finance';
import weather from '../widgets/Weather/reducers/weather';
import bugsHistory from '../widgets/BugsHistory/reducers/bugsHistory';
import generic from './generic/generic';
import widgetList from '../containers/WidgetList/reducers/widgetList';
import widgetSettings from '../components/WidgetSettings/reducers/widgetSettings';

const appReducers = combineReducers({
  bugsHistory,
  generic,
  finance,
  weather,
  widgetList,
  widgetSettings,
});

export default appReducers;
