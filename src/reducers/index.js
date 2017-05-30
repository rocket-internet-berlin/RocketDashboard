import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import weekNumber from './weekNumber';
import bugsDiff from './bugsDiff';
import bugsHistory from './bugsHistory';

const valueChangeReducer = handleActions(
  {
    INCREMENT: (state, { payload: { amount } }) => ({
      counter: state.counter + amount,
    }),

    DECREMENT: (state, { payload: { amount } }) => ({
      counter: state.counter - amount,
    }),
  },
  { counter: 0 },
);

const appReducers = combineReducers({
  weekNumber,
  bugsDiff,
  bugsHistory,
  valueChangeReducer,
});

export default appReducers;
