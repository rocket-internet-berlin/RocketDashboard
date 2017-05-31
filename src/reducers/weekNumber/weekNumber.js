import { handleActions } from 'redux-actions';
import { receiveWeekNumber } from '../../actions/index';

const weekNumber = handleActions(
  {
    [receiveWeekNumber]: (state, { payload }) => ({
      week: payload,
    }),
  },
  { week: 0 },
);

export default weekNumber;
