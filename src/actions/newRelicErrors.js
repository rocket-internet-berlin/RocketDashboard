import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import fetchApi from './fetchApi';

export const requestNewRelicErrors = createAction('NEWRELICERRORS_REQUEST');
export const receiveNewRelicErrors = createAction(
  'NEWRELICERRORS_RECEIVE',
  json => ({
    lastWeek: json.data.lastWeek,
    thisWeek: json.data.thisWeek,
  }),
);

export const fetchNewRelicErrors = () => dispatch => {
  dispatch(requestNewRelicErrors());
  return fetchApi('newRelicErrors').then(json =>
    dispatch(receiveNewRelicErrors(json)),
  );
};
