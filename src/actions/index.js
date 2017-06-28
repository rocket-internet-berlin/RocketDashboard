import { receiveWeekNumber, fetchWeekNumber } from './weekNumber';

import {
  // onReceive,
  refresh as refreshNewRelicErrors,
} from '../widgets/NewRelicErrors/actions/newRelicErrors';

import {
  requestBugsHistory,
  receiveBugsHistory,
  fetchBugsHistory,
} from './bugsHistory';

export {
  receiveWeekNumber,
  fetchWeekNumber,
  requestBugsHistory,
  receiveBugsHistory,
  fetchBugsHistory,
};

export const refreshAll = () => dispatch => {
  // eslint-disable-line import/prefer-default-export
  dispatch(fetchWeekNumber());
  dispatch(refreshNewRelicErrors());
  dispatch(fetchBugsHistory());
};
