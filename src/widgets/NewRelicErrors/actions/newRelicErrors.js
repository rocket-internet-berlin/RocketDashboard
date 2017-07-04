import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import fetchApi from '../../../lib/fetchApi';

export const onReceive = createAction('RECEIVE_NEWRELICERRORS', json => ({
  previous: json.data.previous,
  current: json.data.current,
}));

export const refresh = () => dispatch => {
  fetchApi('newRelic/errors').then(json => dispatch(onReceive(json)));
};
