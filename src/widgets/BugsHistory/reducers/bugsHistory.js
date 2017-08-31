import { handleActions } from 'redux-actions';
import { onReceive } from '../actions/bugsHistory';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({ history: payload.history, updated: payload.updated }),
  },
  {
    history: [],
    updated: null,
  },
);

export default reducer;
