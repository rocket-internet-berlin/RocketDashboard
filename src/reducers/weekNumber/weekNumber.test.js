import weekNumber from './weekNumber';

const { describe, it, expect } = global;

describe('weekNumber reducer', () => {
  it('updates the state with the data from a RECEIVE_WEEKNUMBER action', () => {
    expect(
      weekNumber(
        {},
        {
          type: 'RECEIVE_WEEKNUMBER',
          week: 10,
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
          week: 9,
        },
      ),
    ).toEqual({
      week: 0,
    });
  });
});
