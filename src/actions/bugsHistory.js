import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import fetchApi from '../lib/fetchApi';

export const requestBugsHistory = createAction('REQUEST_BUGSHISTORY');
export const receiveBugsHistory = createAction(
  'RECEIVE_BUGSHISTORY',
  json => json.data,
);

export const fetchBugsHistory = () => dispatch => {
  dispatch(requestBugsHistory());
  return fetchApi('bugsHistory').then(json =>
    dispatch(receiveBugsHistory(json)),
  );
};
