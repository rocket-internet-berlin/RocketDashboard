import 'whatwg-fetch';
import { createAction } from 'redux-actions';

const onReceive = createAction('RECEIVE_BREAKDOWN', (key, { results, description }) => ({
  key,
  results,
  description,
}));

export const refreshBreakdown = ({ key, fetch }) => dispatch => {
  fetch().then(json => dispatch(onReceive(key, json.data)));
};

export default onReceive;
