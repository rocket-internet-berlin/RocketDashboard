import { handleActions } from 'redux-actions';

const counter = handleActions(
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

export default counter;
