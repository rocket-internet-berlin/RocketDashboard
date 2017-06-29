import * as actions from './bugsHistory';

describe('a bugs history receiving action', () => {
  // parsing

  it('creates an action with bugs history', () => {
    const json = {
      data: {
        period: '1 day period',
        history: [{ label: 'yesterday', bugs: 99 }],
      },
    };
    const expectedAction = {
      type: 'RECEIVE_BUGSHISTORY',
      payload: {
        period: '1 day period',
        history: [{ label: 'yesterday', bugs: 99 }],
      },
    };
    expect(actions.receiveBugsHistory(json)).toEqual(expectedAction);
  });

  it('throws if parsing fails', () => {
    const json = { broken_data: {} };
    expect(() => {
      actions.receiveBugsHistory(json);
    }).toThrow();
  });
});
