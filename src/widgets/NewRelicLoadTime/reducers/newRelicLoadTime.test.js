import reducer from './newRelicLoadTime';

describe('newRelicLoadTime reducer', () => {
  it('updates the state with the data from a RECEIVE_NEWRELICLOADTIME action', () => {
    expect(
      reducer(
        {},
        {
          type: 'RECEIVE_NEWRELICLOADTIME',
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
