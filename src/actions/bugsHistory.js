import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import fetchApi from './fetchApi';

export const requestBugsHistory = createAction('REQUEST_BUGSHISTORY');
export const receiveBugsHistory = createAction('RECEIVE_BUGSHISTORY', json => ({
  history: json.data.history,
  period: json.data.period,
}));

export const fetchBugsHistory = () => dispatch => {
  dispatch(requestBugsHistory());
  return fetchApi('bugsHistory').then(json =>
    dispatch(receiveBugsHistory(json)),
  );
};
