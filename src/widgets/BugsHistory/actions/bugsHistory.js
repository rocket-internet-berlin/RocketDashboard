import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import fetchApi from '../../../lib/fetchApi';

export const onReceive = createAction('RECEIVE_BUGSHISTORY', json => json.data);

export const refresh = () => dispatch => {
  fetchApi('bugsHistory').then(json => dispatch(onReceive(json)));
};
