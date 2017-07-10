import newRelicErrorBreakdown from './newRelicErrorBreakdown';

describe('newRelicErrorBreakdown reducer', () => {
  it('updates the state with the data from a RECEIVE_NewRelicErrorBreakdown action', () => {
    expect(
      newRelicErrorBreakdown(
        {
          history: [],
        },
        {
          type: 'RECEIVE_NEWRELICERRORBREAKDOWN',
          payload: [
            {
              openBugs: 1,
              solvedBugs: 2,
              newBugs: 3,
            },
            {
              openBugs: 4,
              solvedBugs: 5,
              newBugs: 6,
            },
          ],
        },
      ),
    ).toEqual({
      history: [
        {
          openBugs: 1,
          solvedBugs: 2,
          newBugs: 3,
        },
        {
          openBugs: 4,
          solvedBugs: 5,
          newBugs: 6,
        },
      ],
    });
  });

  it('does not handle other actions', () => {
    expect(
      newRelicErrorBreakdown(
        {
          history: [],
        },
        {
          type: 'RECEIVE_NEWRELICERRORBREAKDOWN',
          payload: [
            {
              openBugs: 9,
              solvedBugs: 9,
              newBugs: 9,
            },
          ],
        },
      ),
    ).toEqual({
      history: [],
    });
  });
});
