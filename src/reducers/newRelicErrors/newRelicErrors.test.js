import newRelicErrors from './newRelicErrors';

describe('newRelicErrors reducer', () => {
  it('updates the state with the data from a NEWRELICERRORS_RECEIVE action', () => {
    expect(
      newRelicErrors(
        {},
        {
          type: 'NEWRELICERRORS_RECEIVE',
          payload: {
            lastWeek: 10,
            thisWeek: 20,
          },
        },
      ),
    ).toEqual({
      lastWeek: 10,
      thisWeek: 20,
    });
  });

  it('does not handle other actions', () => {
    expect(
      newRelicErrors(
        {
          lastWeek: 0,
          thisWeek: 0,
        },
        {
          type: 'RECEIVE_WEEKNUMBER',
          payload: {
            lastWeek: 9,
            thisWeek: 99,
          },
        },
      ),
    ).toEqual({
      lastWeek: 0,
      thisWeek: 0,
    });
  });
});
