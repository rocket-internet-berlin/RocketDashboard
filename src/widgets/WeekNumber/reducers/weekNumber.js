import { handleActions } from 'redux-actions';
import { onReceive } from '../actions/weekNumber';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({
      week: payload,
    }),
  },
  { week: 0 },
);

export default reducer;
