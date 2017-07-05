import * as actions from './bugsHistory';

describe('a bugs history receiving action', () => {
  it('creates an action with bugs history', () => {
    const json = {
      data: [{ openBugs: 1, solvedBugs: 2, newBugs: 3 }],
    };
    const expectedAction = {
      type: 'RECEIVE_BUGSHISTORY',
      payload: [{ openBugs: 1, solvedBugs: 2, newBugs: 3 }],
    };
    expect(actions.onReceive(json)).toEqual(expectedAction);
  });
});
