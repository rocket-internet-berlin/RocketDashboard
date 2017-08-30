import { refresh as refreshGeneric } from './generic/generic';
import { refresh as refreshBugsHistory } from '../widgets/BugsHistory/actions/bugsHistory';
import { refresh as refreshFinance } from './finance/finance';
import { refresh as refreshWeather } from '../widgets/Weather/actions/weather';
import { showModal, closeModal } from '../components/WidgetSettings/actions/widgetSettings';
import dataSources from '../dataSources/dataSources';

// TODO: Possibly refactor using Observers pattern. This way we won't have to add widgets here manually.
const refreshAll = () => dispatch => {
  dispatch(refreshBugsHistory());
  dispatch(refreshFinance());
  dispatch(refreshWeather());
  dataSources.forEach(dataSource => {
    dispatch(refreshGeneric(dataSource));
  });
};

const showWidgetModal = () => dispatch => {
  dispatch(showModal());
};

const closeWidgetModal = () => dispatch => {
  dispatch(closeModal());
};

export { refreshAll, showWidgetModal, closeWidgetModal };
