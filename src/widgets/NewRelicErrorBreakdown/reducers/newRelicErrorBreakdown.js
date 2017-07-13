import { handleActions } from 'redux-actions';
import { onReceive } from '../actions/newRelicErrorBreakdown';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => payload,
  },
  [],
);

export default reducer;