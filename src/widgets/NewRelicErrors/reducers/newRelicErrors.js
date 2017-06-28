import { handleActions } from 'redux-actions';
import { onReceive } from '../actions/newRelicErrors';

const reducers = handleActions(
  {
    [onReceive]: (state, { payload }) => ({
      previous: payload.previous,
      current: payload.current,
    }),
  },
  {
    previous: 0,
    current: 0,
  },
);

export default reducers;
