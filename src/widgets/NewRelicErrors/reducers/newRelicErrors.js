import { handleActions } from 'redux-actions';
import { receiveNewRelicErrors } from '../../actions';

const newRelicErrors = handleActions(
  {
    [receiveNewRelicErrors]: (state, { payload }) => ({
      previous: payload.previous,
      current: payload.current,
    }),
  },
  {
    previous: 0,
    current: 0,
  },
);

export default newRelicErrors;
