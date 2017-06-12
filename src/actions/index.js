import { receiveWeekNumber, fetchWeekNumber } from './weekNumber';
import { requestBugsDiff, receiveBugsDiff, fetchBugsDiff } from './bugsDiff';
import {
  requestBugsHistory,
  receiveBugsHistory,
  fetchBugsHistory,
} from './bugsHistory';

export {
  receiveWeekNumber,
  fetchWeekNumber,
  requestBugsDiff,
  receiveBugsDiff,
  fetchBugsDiff,
  requestBugsHistory,
  receiveBugsHistory,
  fetchBugsHistory,
};

export const refreshAll = () => dispatch => {
  dispatch(fetchWeekNumber());
  dispatch(fetchBugsDiff());
  dispatch(fetchBugsHistory());
};
