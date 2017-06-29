import reducer from './newRelicErrors';

describe('newRelicErrors reducer', () => {
  it('updates the state with the data from a RECEIVE_NEWRELICERRORS action', () => {
    expect(
      reducer(
        {},
        {
          type: 'RECEIVE_NEWRELICERRORS',
          payload: {
            previous: 10,
            current: 20,
          },
        },
      ),
    ).toEqual({
      previous: 10,
      current: 20,
    });
  });

  it('does not handle other actions', () => {
    expect(
      reducer(
        {
          previous: 0,
          current: 0,
        },
        {
          type: 'OTHER_EVENT',
          payload: {
            previous: 9,
            current: 99,
          },
        },
      ),
    ).toEqual({
      previous: 0,
      current: 0,
    });
  });
});
