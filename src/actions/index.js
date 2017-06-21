import { receiveWeekNumber, fetchWeekNumber } from './weekNumber';
import {
  requestNewRelicErrors,
  receiveNewRelicErrors,
  fetchNewRelicErrors,
} from './newRelicErrors';
import {
  requestBugsHistory,
  receiveBugsHistory,
  fetchBugsHistory,
} from './bugsHistory';

export {
  receiveWeekNumber,
  fetchWeekNumber,
  requestNewRelicErrors,
  receiveNewRelicErrors,
  fetchNewRelicErrors,
  requestBugsHistory,
  receiveBugsHistory,
  fetchBugsHistory,
};

export const refreshAll = () => dispatch => {
  dispatch(fetchWeekNumber());
  dispatch(fetchNewRelicErrors());
  dispatch(fetchBugsHistory());
};
