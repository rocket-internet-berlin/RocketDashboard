import moment from 'moment';
import onReceive from '../../Number/actions/number';

const refreshWeekNumber = () => dispatch => {
  const getWeek = () => parseInt(moment().format('w'), 10);
  return dispatch(onReceive('weekNumber', getWeek()));
};

export default refreshWeekNumber;
