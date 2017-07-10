import newRelicWebsiteFunnel from './newRelicWebsiteFunnel';

describe('newRelicWebsiteFunnel reducer', () => {
  it('updates the state with the data from a RECEIVE_NewRelicWebsiteFunnel action', () => {
    expect(
      newRelicWebsiteFunnel(
        {
          history: [],
        },
        {
          type: 'RECEIVE_NEWRELICWebsiteFunnel',
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
      newRelicWebsiteFunnel(
        {
          history: [],
        },
        {
          type: 'RECEIVE_NEWRELICWebsiteFunnel',
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
