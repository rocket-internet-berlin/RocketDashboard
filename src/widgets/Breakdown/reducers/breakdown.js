import { handleActions } from 'redux-actions';
import { onReceive } from '../actions/breakdown';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => payload,
  },
  {
    results: [],
  },
);

export default reducer;
