import bugsDiff from './bugsDiff';

describe('bugsDiff reducer', () => {
  it('should handle RECEIVE_BUGSDIFF', () => {
    expect(
      bugsDiff(
        {},
        {
          type: 'RECEIVE_BUGSDIFF',
          lastWeek: 10,
          thisWeek: 20,
        },
      ),
    ).toEqual({
      lastWeek: 10,
      thisWeek: 20,
    });
  });

  it('should not handle other actions', () => {
    expect(
      bugsDiff(
        {
          lastWeek: 0,
          thisWeek: 0,
        },
        {
          type: 'RECEIVE_WEEKNUMBER',
          lastWeek: 9,
          thisWeek: 99,
        },
      ),
    ).toEqual({
      lastWeek: 0,
      thisWeek: 0,
    });
  });
});
