import weekNumber from './weekNumber';

describe('weekNumber reducer', () => {
  it('updates the state with the data from a RECEIVE_WEEKNUMBER action', () => {
    expect(
      weekNumber(
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
      weekNumber(
        {
          week: 0,
        },
        {
          type: 'RECEIVE_BUGSDIFF',
          payload: 9,
        },
      ),
    ).toEqual({
      week: 0,
    });
  });
});