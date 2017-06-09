import { createAction } from 'redux-actions';
import moment from 'moment';

export const receiveWeekNumber = createAction(
  'RECEIVE_WEEKNUMBER',
  week => week,
);

export const fetchWeekNumber = () => dispatch => {
  const getWeek = () => parseInt(moment().format('w'), 10);
  return dispatch(receiveWeekNumber(getWeek()));
};
