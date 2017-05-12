import 'whatwg-fetch';

export const requestWeekNumber = () => ({
  type: 'REQUEST_WEEKNUMBER',
});

export const receiveWeekNumber = json => ({
  type: 'RECEIVE_WEEKNUMBER',
  week: json.data.week,
});

export const fetchWeekNumber = () => dispatch => {
  dispatch(requestWeekNumber());
  return fetch('/mock/weekNumberApi.json')
    .then(response => response.json())
    .then(json => dispatch(receiveWeekNumber(json)));
};

export const requestBugsDiff = () => ({
  type: 'REQUEST_BUGSDIFF',
});

export const receiveBugsDiff = json => ({
  type: 'RECEIVE_BUGSDIFF',
  lastWeek: json.data.lastWeek,
  thisWeek: json.data.thisWeek,
});

export const fetchBugsDiff = () => dispatch => {
  dispatch(requestBugsDiff());
  return fetch('/mock/bugsDiffApi.json')
    .then(response => response.json())
    .then(json => dispatch(receiveBugsDiff(json)));
};

export const refreshAll = () => dispatch => {
  dispatch(fetchWeekNumber());
  dispatch(fetchBugsDiff());
};
