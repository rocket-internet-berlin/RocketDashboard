import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import fetchApi from '../../../lib/fetchApi';

export const onReceive = createAction('RECEIVE_NEWRELICLOADTIME', json => ({
  current: json.data.current,
}));

export const refresh = () => dispatch => {
  fetchApi('newRelic/loadTime').then(json => dispatch(onReceive(json)));
};
