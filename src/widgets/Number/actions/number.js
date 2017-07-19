import { createAction } from 'redux-actions';

const onReceive = createAction('RECEIVE_NUMBER', (key, { current, previous, description }) => ({
  key,
  current,
  previous,
  description,
}));

export const refreshNumber = ({ key, fetch }) => dispatch => {
  fetch().then(json => dispatch(onReceive(key, json.data)));
};

export default onReceive;
