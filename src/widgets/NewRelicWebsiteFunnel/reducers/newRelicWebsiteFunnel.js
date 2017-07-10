import { handleActions } from 'redux-actions';
import { onReceive } from '../actions/newRelicWebsiteFunnel';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => payload,
  },
  [],
);

export default reducer;
