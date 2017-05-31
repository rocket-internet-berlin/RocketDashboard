import counter from './counter';

describe('counter reducer', () => {
  it('updates the state with the data from a INCREMENT action', () => {
    expect(
      counter(
        { counter: 0 },
        {
          type: 'INCREMENT',
          payload: {
            amount: 1,
          },
        },
      ),
    ).toEqual({ counter: 1 });
  });
});
