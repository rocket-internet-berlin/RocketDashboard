import weekNumber from './weekNumber';

describe('weekNumber reducer', () => {
  it('should handle RECEIVE_WEEKNUMBER', () => {
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

  it('should not handle other actions', () => {
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
