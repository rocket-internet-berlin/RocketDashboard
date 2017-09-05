import { handleActions } from 'redux-actions';
import { onReceive } from '../actions/instagram';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({ instagram: payload.data }),
  },
  {
    instagram: {},
  },
);

export default reducer;
