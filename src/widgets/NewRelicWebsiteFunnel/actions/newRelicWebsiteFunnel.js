import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import fetchApi from '../../../lib/fetchApi';

export const onReceive = createAction('RECEIVE_NEWRELICWEBSITEFUNNEL', json => json.data);

export const refresh = () => dispatch => {
  fetchApi('newRelic/WebsiteFunnel').then(json => dispatch(onReceive(json)));
};
