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

import {
  requestJiraIssues,
  receiveJiraIssues,
  fetchJiraIssues,
} from './jiraIssues';

export {
  receiveWeekNumber,
  fetchWeekNumber,
  requestNewRelicErrors,
  receiveNewRelicErrors,
  fetchNewRelicErrors,
  requestBugsHistory,
  receiveBugsHistory,
  fetchBugsHistory,
  requestJiraIssues,
  receiveJiraIssues,
  fetchJiraIssues,
};

export const refreshAll = () => dispatch => {
  dispatch(fetchWeekNumber());
  dispatch(fetchNewRelicErrors());
  dispatch(fetchBugsHistory());
  dispatch(fetchJiraIssues());
};
