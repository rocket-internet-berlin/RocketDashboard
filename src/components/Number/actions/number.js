import 'whatwg-fetch';
import { createAction } from 'redux-actions';

const onReceive = createAction('RECEIVE_NUMBER', (key, current, previous) => ({
  key,
  previous,
  current,
}));

export default onReceive;
