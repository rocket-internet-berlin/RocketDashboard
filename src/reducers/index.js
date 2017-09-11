import { combineReducers } from 'redux';
import finance from './finance/finance';
import weather from '../widgets/Weather/reducers/weather';
import bugsHistory from './history/bugsHistory';
import generic from './generic/generic';
import widgetList from '../containers/WidgetList/reducers/widgetList';
import widgetSettings from '../components/WidgetSettings/reducers/widgetSettings';
import statusCakeHistory from './history/statusCakeHistory';

const appReducers = combineReducers({
  bugsHistory,
  generic,
  finance,
  weather,
  widgetList,
  widgetSettings,
  statusCakeHistory,
});

export default appReducers;
