import bugsDiff from './bugsDiff';

describe('bugsDiff reducer', () => {
  it('updates the state with the data from a RECEIVE_BUGSDIFF action', () => {
    expect(
      bugsDiff(
        {},
        {
          type: 'RECEIVE_BUGSDIFF',
          payload: {
            lastWeek: 10,
            thisWeek: 20,
          },
        },
      ),
    ).toEqual({
      lastWeek: 10,
      thisWeek: 20,
    });
  });

  it('does not handle other actions', () => {
    expect(
      bugsDiff(
        {
          lastWeek: 0,
          thisWeek: 0,
        },
        {
          type: 'RECEIVE_WEEKNUMBER',
          payload: {
            lastWeek: 9,
            thisWeek: 99,
          },
        },
      ),
    ).toEqual({
      lastWeek: 0,
      thisWeek: 0,
    });
  });
});
