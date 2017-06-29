import * as actions from './newRelicErrors';

describe('a bugs difference receiving action', () => {
  // parsing

  it('creates an action with bugs difference', () => {
    const json = { data: { previous: 99, current: 9 } };
    const expectedAction = {
      type: 'RECEIVE_NEWRELICERRORS',
      payload: {
        previous: 99,
        current: 9,
      },
    };
    expect(actions.onReceive(json)).toEqual(expectedAction);
  });

  it('throws if parsing fails', () => {
    const json = { broken_data: { previous: 99, current: 9 } };
    expect(() => {
      actions.onReceive(json);
    }).toThrow();
  });
});
