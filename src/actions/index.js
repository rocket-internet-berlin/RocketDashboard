import 'whatwg-fetch';

export const requestWeekNumber = () => ({
  type: 'REQUEST_WEEKNUMBER',
});

export const receiveWeekNumber = (json) => ({
  type: 'RECEIVE_WEEKNUMBER',
  week: json.data.week,
  receivedAt: Date.now(),
});

export const fetchWeekNumber = () => dispatch => {
  dispatch(requestWeekNumber());
  return fetch('http://mockbin.org/bin/af0bab28-d7f8-4ff5-8131-53ffd952abe2')
    .then(response => response.json())
    .then(json => dispatch(receiveWeekNumber(json)));
};

export const refreshAll = () => dispatch => {
  dispatch(fetchWeekNumber());
};

export const refreshSome = () => ({
  type: 'REFRESH_SOME',
});
