import * as actions from './newRelicErrorBreakdown';

describe('newRelicErrorBreakdown action', () => {
  it('creates a correct action', () => {
    const json = {
      data: [
        {
          name: 'Some\\Error',
          count: 99,
        },
        {
          name: 'Another\\Notice',
          count: 11,
        },
      ],
    };
    const expectedAction = {
      type: 'RECEIVE_NEWRELICERRORBREAKDOWN',
      payload: [{ name: 'Some\\Error', count: 99 }, { name: 'Another\\Notice', count: 11 }],
    };
    expect(actions.onReceive(json)).toEqual(expectedAction);
  });
});
