import 'whatwg-fetch';
import { createAction } from 'redux-actions';

const onReceive = createAction('RECEIVE_NUMBER', (key, { current, previous, description }) => ({
  key,
  current,
  previous,
  description,
}));

export default onReceive;
