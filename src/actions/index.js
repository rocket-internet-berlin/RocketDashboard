import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import {
  REQUEST_WEEKNUMBER,
  RECEIVE_WEEKNUMBER,
  REQUEST_BUGSDIFF,
  RECEIVE_BUGSDIFF,
  RECEIVE_BUGSHISTORY,
  REQUEST_BUGSHISTORY,
} from '../constants/actionTypes';

const fetchAPI = url => fetch(`/api/${url}`).then(response => response.json());

// week number

export const requestWeekNumber = createAction(REQUEST_WEEKNUMBER);
export const receiveWeekNumber = createAction(
  RECEIVE_WEEKNUMBER,
  json => json.data.week,
);

export const fetchWeekNumber = () => dispatch => {
  dispatch(requestWeekNumber());
  return fetchAPI('weekNumber').then(json => dispatch(receiveWeekNumber(json)));
};

// bugs diffrence

export const requestBugsDiff = createAction(REQUEST_BUGSDIFF);
export const receiveBugsDiff = createAction(RECEIVE_BUGSDIFF, json => ({
  lastWeek: json.data.lastWeek,
  thisWeek: json.data.thisWeek,
}));

export const fetchBugsDiff = () => dispatch => {
  dispatch(requestBugsDiff());
  return fetchAPI('bugsDiff').then(json => dispatch(receiveBugsDiff(json)));
};

// bugs history

export const requestBugsHistory = createAction(REQUEST_BUGSHISTORY);
export const receiveBugsHistory = createAction(RECEIVE_BUGSHISTORY, json => ({
  history: json.data.history,
  period: json.data.period,
}));

export const fetchBugsHistory = () => dispatch => {
  dispatch(requestBugsHistory());
  return fetchAPI('bugsHistory').then(json =>
    dispatch(receiveBugsHistory(json)),
  );
};

// refresh all

export const refreshAll = () => dispatch => {
  dispatch(fetchWeekNumber());
  dispatch(fetchBugsDiff());
  dispatch(fetchBugsHistory());
};
