import bugsHistory from './bugsHistory';

describe('bugsHistory reducer', () => {
  it('updates the state with the data from a RECEIVE_BUGSHISTORY action', () => {
    expect(
      bugsHistory(
        {
          history: [],
          period: 'loading...',
        },
        {
          type: 'RECEIVE_BUGSHISTORY',
          period: 'Last 2 Days',
          history: [
            {
              label: 'yesterday',
              bugs: 9,
            },
            {
              label: 'today',
              bugs: 99,
            },
          ],
        },
      ),
    ).toEqual({
      period: 'Last 2 Days',
      history: [
        {
          label: 'yesterday',
          bugs: 9,
        },
        {
          label: 'today',
          bugs: 99,
        },
      ],
    });
  });

  it('does not handle other actions', () => {
    expect(
      bugsHistory(
        {
          history: [],
          period: 'loading...',
        },
        {
          type: 'RECEIVE_WEEKNUMBER',
          history: [
            {
              label: 'today',
              bugs: 99,
            },
          ],
          period: 'Only today',
        },
      ),
    ).toEqual({
      history: [],
      period: 'loading...',
    });
  });
});
