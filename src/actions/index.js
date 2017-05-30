import 'whatwg-fetch';
import { createActions } from 'redux-actions';
import {
  REQUEST_WEEKNUMBER,
  RECEIVE_WEEKNUMBER,
  REQUEST_BUGSDIFF,
  RECEIVE_BUGSDIFF,
  RECEIVE_BUGSHISTORY,
  REQUEST_BUGSHISTORY,
} from '../constants/actionTypes';

// week number

export const requestWeekNumber = () => ({
  type: REQUEST_WEEKNUMBER,
});

export const receiveWeekNumber = json => ({
  type: RECEIVE_WEEKNUMBER,
  week: json.data.week,
});

export const fetchWeekNumber = () => dispatch => {
  dispatch(requestWeekNumber());
  return fetch('/api/weekNumber')
    .then(response => response.json())
    .then(json => dispatch(receiveWeekNumber(json)));
};

// bugs diffrence

export const requestBugsDiff = () => ({
  type: REQUEST_BUGSDIFF,
});

export const receiveBugsDiff = json => ({
  type: RECEIVE_BUGSDIFF,
  lastWeek: json.data.lastWeek,
  thisWeek: json.data.thisWeek,
});

export const fetchBugsDiff = () => dispatch => {
  dispatch(requestBugsDiff());
  return fetch('/api/bugsDiff')
    .then(response => response.json())
    .then(json => dispatch(receiveBugsDiff(json)));
};

// bugs history

export const requestBugsHistory = () => ({
  type: REQUEST_BUGSHISTORY,
});

export const receiveBugsHistory = json => ({
  type: RECEIVE_BUGSHISTORY,
  history: json.data.history,
  period: json.data.period,
});

export const fetchBugsHistory = () => dispatch => {
  dispatch(requestBugsHistory());
  return fetch('/api/bugsHistory')
    .then(response => response.json())
    .then(json => dispatch(receiveBugsHistory(json)));
};

// refresh all

export const refreshAll = () => dispatch => {
  dispatch(fetchWeekNumber());
  dispatch(fetchBugsDiff());
  dispatch(fetchBugsHistory());
};

export const { increment, decrement } = createActions({
  INCREMENT: amount => ({ amount }),
  DECREMENT: amount => ({ amount }),
});

console.log(increment(15));
