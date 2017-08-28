import { handleActions } from 'redux-actions';
import { onReceive } from '../../actions/finance/finance';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({ finance: payload }),
  },
  {
    finance: {},
  },
);

export default reducer;
