import * as actions from './weekNumber';

describe('a week number receiving action', () => {
  // parsing

  it('creates an action with a week number', () => {
    const json = { data: { week: 99 } };
    const expectedAction = {
      type: 'RECEIVE_WEEKNUMBER',
      payload: 99,
    };
    expect(actions.receiveWeekNumber(json)).toEqual(expectedAction);
  });

  it('throws if parsing fails', () => {
    const json = { broken_data: { week: 99 } };
    expect(() => {
      actions.receiveWeekNumber(json);
    }).toThrow();
  });
});
