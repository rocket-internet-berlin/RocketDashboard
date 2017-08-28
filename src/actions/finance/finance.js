import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import { fetchApi } from '../../lib/fetchApi';

export const onReceive = createAction('RECEIVE_FINANCE', json => json.data);

export const refresh = () => dispatch => {
  fetchApi('finance/stock').then(json => dispatch(onReceive(json)));
};
