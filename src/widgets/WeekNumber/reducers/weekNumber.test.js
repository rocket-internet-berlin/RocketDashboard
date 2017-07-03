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
      week: 10,
    });
  });

  it('does not handle other actions', () => {
    expect(
      reducer(
        {
          week: 0,
        },
        {
          type: 'OTHER_EVENT',
          payload: 9,
        },
      ),
    ).toEqual({
      week: 0,
    });
  });
});
