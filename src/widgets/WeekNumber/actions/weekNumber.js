import { createAction } from 'redux-actions';
import moment from 'moment';

export const onReceive = createAction('RECEIVE_WEEKNUMBER', week => week);

export const refresh = () => dispatch => {
  const getWeek = () => parseInt(moment().format('w'), 10);
  return dispatch(onReceive(getWeek()));
};
