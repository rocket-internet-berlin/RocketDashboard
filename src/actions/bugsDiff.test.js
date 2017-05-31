import * as actions from './bugsDiff';

describe('a bugs difference receiving action', () => {
  // parsing

  it('creates an action with bugs difference', () => {
    const json = { data: { lastWeek: 99, thisWeek: 9 } };
    const expectedAction = {
      type: 'RECEIVE_BUGSDIFF',
      payload: {
        lastWeek: 99,
        thisWeek: 9,
      },
    };
    expect(actions.receiveBugsDiff(json)).toEqual(expectedAction);
  });

  it('throws if parsing fails', () => {
    const json = { broken_data: { lastWeek: 99, thisWeek: 9 } };
    expect(() => {
      actions.receiveBugsDiff(json);
    }).toThrow();
  });
});
