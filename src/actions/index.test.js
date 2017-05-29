import * as actions from './index';

describe('a week number receiving action', () => {
  // parsing

  it('creates an action with a week number', () => {
    const json = { data: { week: 99 } };
    const expectedAction = {
      type: 'RECEIVE_WEEKNUMBER',
      week: 99,
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

describe('a bugs difference receiving action', () => {
  // parsing

  it('creates an action with bugs difference', () => {
    const json = { data: { lastWeek: 99, thisWeek: 9 } };
    const expectedAction = {
      type: 'RECEIVE_BUGSDIFF',
      lastWeek: 99,
      thisWeek: 9,
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
      period: '1 day period',
      history: [{ label: 'yesterday', bugs: 99 }],
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
