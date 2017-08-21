import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import { fetchApi } from '../../../lib/fetchApi';

export const onReceive = createAction('RECEIVE_WEATHER', json => json);

export const refresh = () => dispatch => {
  fetchApi('weather/current').then(json => dispatch(onReceive(json)));
};
