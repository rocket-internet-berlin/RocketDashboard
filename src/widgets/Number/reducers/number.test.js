import reducer from './number';

describe('number reducer', () => {
  it('updates the state with the data from a RECEIVE_NUMBER action', () => {
    const previousState = {};
    const action = { type: 'RECEIVE_NUMBER', payload: { key: 'something', current: 9, previous: 99 } };

    const actual = reducer(previousState, action);
    const expected = { something: { current: 9, previous: 99 } };

    expect(actual).toEqual(expected);
  });
});
