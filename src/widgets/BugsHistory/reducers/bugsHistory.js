import { handleActions } from 'redux-actions';
import { onReceive } from '../actions/bugsHistory';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({ history: payload }),
  },
  {
    history: [],
  },
);

export default reducer;
