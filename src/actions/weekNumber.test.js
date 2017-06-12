import * as actions from './weekNumber';

describe('a week number receiving action', () => {
  // parsing

  it('creates an action with a week number', () => {
    const week = 99;
    const expectedAction = {
      type: 'RECEIVE_WEEKNUMBER',
      payload: week,
    };
    expect(actions.receiveWeekNumber(week)).toEqual(expectedAction);
  });
});
