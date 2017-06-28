import * as actions from './bugsHistory';

describe('a bugs history receiving action', () => {
  // parsing

  it('creates an action with bugs history', () => {
    const json = {
      data: [{ openBbugs: 1, solvedBugs: 2, newBugs: 3 }],
    };
    const expectedAction = {
      type: 'RECEIVE_BUGSHISTORY',
      payload: [{ openBbugs: 1, solvedBugs: 2, newBugs: 3 }],
    };
    expect(actions.receiveBugsHistory(json)).toEqual(expectedAction);
  });
});
