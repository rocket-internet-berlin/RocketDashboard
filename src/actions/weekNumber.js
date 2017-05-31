import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import fetchApi from './fetchApi';

export const requestWeekNumber = createAction('REQUEST_WEEKNUMBER');
export const receiveWeekNumber = createAction(
  'RECEIVE_WEEKNUMBER',
  json => json.data.week,
);

export const fetchWeekNumber = () => dispatch => {
  dispatch(requestWeekNumber());
  return fetchApi('weekNumber').then(json => dispatch(receiveWeekNumber(json)));
};
