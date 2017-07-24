import { createAction } from 'redux-actions';

const onReceive = createAction('RECEIVE_DATA', (key, data) => ({
  key,
  ...data,
}));

export const refresh = ({ key, fetchFunction }) => dispatch => {
  fetchFunction().then(json => dispatch(onReceive(key, json.data)));
};

export default onReceive;
