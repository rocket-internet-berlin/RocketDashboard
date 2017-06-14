import * as actions from './newRelicErrors';

describe('a bugs difference receiving action', () => {
  // parsing

  it('creates an action with bugs difference', () => {
    const json = { data: { lastWeek: 99, thisWeek: 9 } };
    const expectedAction = {
      type: 'NEWRELICERRORS_RECEIVE',
      payload: {
        lastWeek: 99,
        thisWeek: 9,
      },
    };
    expect(actions.receiveNewRelicErrors(json)).toEqual(expectedAction);
  });

  it('throws if parsing fails', () => {
    const json = { broken_data: { lastWeek: 99, thisWeek: 9 } };
    expect(() => {
      actions.receiveNewRelicErrors(json);
    }).toThrow();
  });
});
