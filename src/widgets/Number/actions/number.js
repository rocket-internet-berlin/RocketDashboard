import 'whatwg-fetch';
import { createAction } from 'redux-actions';
import { fetchUrl } from '../../../lib/fetchApi';

const onReceive = createAction('RECEIVE_NUMBER', (key, { current, previous, description }) => ({
  key,
  current,
  previous,
  description,
}));

export const refreshNumber = (key, url) => dispatch => {
  fetchUrl(url).then(json => dispatch(onReceive(key, json.data.current, json.data.previous)));
};

export default onReceive;
