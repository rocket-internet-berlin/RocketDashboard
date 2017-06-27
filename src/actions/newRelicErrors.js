import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import fetchApi from './fetchApi';

export const requestNewRelicErrors = createAction('NEWRELICERRORS_REQUEST');
export const receiveNewRelicErrors = createAction(
  'NEWRELICERRORS_RECEIVE',
  json => ({
    previous: json.data.previous,
    current: json.data.current,
  }),
);

export const fetchNewRelicErrors = () => dispatch => {
  dispatch(requestNewRelicErrors());
  return fetchApi('newRelicErrors').then(json =>
    dispatch(receiveNewRelicErrors(json)),
  );
};