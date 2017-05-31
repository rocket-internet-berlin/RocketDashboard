import { handleActions } from 'redux-actions';
import { receiveBugsDiff } from '../../actions';

const bugsDiff = handleActions(
  {
    [receiveBugsDiff]: (state, { payload }) => ({
      lastWeek: payload.lastWeek,
      thisWeek: payload.thisWeek,
    }),
  },
  {
    lastWeek: 0,
    thisWeek: 0,
  },
);

export default bugsDiff;
