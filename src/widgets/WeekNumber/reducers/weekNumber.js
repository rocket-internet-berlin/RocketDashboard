import { handleActions } from 'redux-actions';
import { onReceive } from '../actions/weekNumber';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({
      current: payload,
    }),
  },
  { current: 0 },
);

export default reducer;
