import { refresh as refreshGeneric } from './generic/generic';
import { refresh as refreshBugsHistory } from '../widgets/BugsHistory/actions/bugsHistory';
import { refresh as refreshFinance } from '../widgets/Finance/actions/finance';
import dataSources from '../dataSources/dataSources';

// TODO: Possibly refactor using Observers pattern. This way we won`t have to add widgets here manually.
const refreshAll = () => dispatch => {
  dispatch(refreshBugsHistory());
  dispatch(refreshFinance());
  dataSources.forEach(dataSource => {
    dispatch(refreshGeneric(dataSource));
  });
};

export { refreshAll }; // eslint-disable-line import/prefer-default-export
