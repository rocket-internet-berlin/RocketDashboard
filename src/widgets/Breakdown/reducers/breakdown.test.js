import reducer from './breakdown';

describe('breakdown reducer', () => {
  it('updates the state with the data from a RECEIVE_NEWRELICERRORBREAKDOWN action', () => {
    expect(
      reducer([], {
        type: 'RECEIVE_NEWRELICERRORBREAKDOWN',
        payload: [
          {
            name: 'Some\\Error',
            count: 99,
          },
          {
            name: 'Another\\Notice',
            count: 11,
          },
        ],
      }),
    ).toEqual([
      {
        name: 'Some\\Error',
        count: 99,
      },
      {
        name: 'Another\\Notice',
        count: 11,
      },
    ]);
  });

  it('does not handle other actions', () => {
    expect(
      reducer([], {
        type: 'OTHER_ACTION',
        payload: [
          {
            name: 'Some\\Error',
            count: 99,
          },
          {
            name: 'Another\\Notice',
            count: 11,
          },
        ],
      }),
    ).toEqual([]);
  });
});
