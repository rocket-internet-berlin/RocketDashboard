import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import fetchApi from './fetchApi';

export const requestBugsDiff = createAction('REQUEST_BUGSDIFF');
export const receiveBugsDiff = createAction('RECEIVE_BUGSDIFF', json => ({
  lastWeek: json.data.lastWeek,
  thisWeek: json.data.thisWeek,
}));

export const fetchBugsDiff = () => dispatch => {
  dispatch(requestBugsDiff());
  return fetchApi('bugsDiff').then(json => dispatch(receiveBugsDiff(json)));
};
