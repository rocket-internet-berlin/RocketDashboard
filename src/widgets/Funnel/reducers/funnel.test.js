import reducer from './newRelicWebsiteFunnel';

describe('newRelicErrorBreakdown reducer', () => {
  it('updates the state with the data from a RECEIVE_NEWRELICWEBSITEFUNNEL action', () => {
    expect(
      reducer([], {
        type: 'RECEIVE_NEWRELICWEBSITEFUNNEL',
        payload: [
          {
            name: 'Page 1',
            count: 99,
          },
          {
            name: 'Page 2',
            count: 88,
          },
        ],
      }),
    ).toEqual([
      {
        name: 'Page 1',
        count: 99,
      },
      {
        name: 'Page 2',
        count: 88,
      },
    ]);
  });

  it('does not handle other actions', () => {
    expect(
      reducer([], {
        type: 'OTHER_ACTION',
        payload: [
          {
            name: 'Page 1',
            count: 99,
          },
          {
            name: 'Page 2',
            count: 88,
          },
        ],
      }),
    ).toEqual([]);
  });
});
