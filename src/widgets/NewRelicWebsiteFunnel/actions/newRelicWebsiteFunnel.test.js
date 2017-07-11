import * as actions from './newRelicWebsiteFunnel';

describe('newRelicWebsiteFunnel action', () => {
  it('creates a correct action', () => {
    const json = {
      data: [
        {
          name: 'Page 1',
          count: 99,
        },
        {
          name: 'Page 2',
          count: 11,
        },
      ],
    };
    const expectedAction = {
      type: 'RECEIVE_NEWRELICWEBSITEFUNNEL',
      payload: [{ name: 'Page 1', count: 99 }, { name: 'Page 2', count: 11 }],
    };
    expect(actions.onReceive(json)).toEqual(expectedAction);
  });
});
