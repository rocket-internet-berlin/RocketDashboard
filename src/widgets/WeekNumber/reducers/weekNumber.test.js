import reducer from './weekNumber';

describe('weekNumber reducer', () => {
  it('updates the state with the data from a RECEIVE_WEEKNUMBER action', () => {
    expect(
      reducer(
        {},
        {
          type: 'RECEIVE_WEEKNUMBER',
          payload: 10,
        },
      ),
    ).toEqual({
      current: 10,
    });
  });

  it('does not handle other actions', () => {
    expect(
      reducer(
        {
          current: 0,
        },
        {
          type: 'OTHER_EVENT',
          payload: 9,
        },
      ),
    ).toEqual({
      current: 0,
    });
  });
});
