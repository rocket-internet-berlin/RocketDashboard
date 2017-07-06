import * as actions from './bugsHistory';

describe('bugsHistory reponse parsing', () => {
  it('creates a correct action', () => {
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
