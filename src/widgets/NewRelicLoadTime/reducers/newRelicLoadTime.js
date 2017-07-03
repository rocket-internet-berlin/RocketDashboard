import { handleActions } from 'redux-actions';
import _round from 'lodash/round';

import { onReceive } from '../actions/newRelicLoadTime';

const reducer = handleActions(
  {
    [onReceive]: (state, { payload }) => ({
      current: _round(payload.current, 2),
    }),
  },
  {
    current: 0,
  },
);

export default reducer;
