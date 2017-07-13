import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import fetchApi from '../../../lib/fetchApi';

export const onReceive = createAction('RECEIVE_NEWRELICERRORBREAKDOWN', json => json.data);

export const refresh = () => dispatch => {
  fetchApi('newRelic/errorBreakdown').then(json => dispatch(onReceive(json)));
};
