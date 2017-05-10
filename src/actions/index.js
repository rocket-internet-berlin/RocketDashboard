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
  return fetch('/weekNumberApi.json')
    .then(response => response.json())
    .then(json => dispatch(receiveWeekNumber(json)));
};

export const refreshAll = () => dispatch => {
  dispatch(fetchWeekNumber());
};

export const refreshSome = () => ({
  type: 'REFRESH_SOME',
});
