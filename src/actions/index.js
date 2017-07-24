import { refresh } from './generic/generic';
import { refresh as refreshBugsHistory } from '../widgets/BugsHistory/actions/bugsHistory';
import dataSources from '../dataSources/dataSources';

// TODO: Possibly refactor using Observers pattern. This way we won`t have to add widgets here manually.
const refreshAll = () => dispatch => {
  dispatch(refreshBugsHistory());
  dataSources.forEach(dataSource => {
    dispatch(refresh(dataSource));
  });
};

export { refreshAll }; // eslint-disable-line import/prefer-default-export
