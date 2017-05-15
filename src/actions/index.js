import 'whatwg-fetch';

// week number

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

// bugs diffrence

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

// bugs history

export const requestBugsHistory = () => ({
  type: 'REQUEST_BUGSHISTORY',
});

export const receiveBugsHistory = json => ({
  type: 'RECEIVE_BUGSHISTORY',
  history: json.data.history,
  period: json.data.period,
});

export const fetchBugsHistory = () => dispatch => {
  dispatch(requestBugsHistory());
  return fetch('/mock/bugsHistoryApi.json')
    .then(response => response.json())
    .then(json => dispatch(receiveBugsHistory(json)));
};

// refresh all

export const refreshAll = () => dispatch => {
  dispatch(fetchWeekNumber());
  dispatch(fetchBugsDiff());
  dispatch(fetchBugsHistory());
};
