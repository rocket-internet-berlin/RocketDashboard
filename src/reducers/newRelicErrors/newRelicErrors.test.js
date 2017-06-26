import newRelicErrors from './newRelicErrors';

describe('newRelicErrors reducer', () => {
  it('updates the state with the data from a NEWRELICERRORS_RECEIVE action', () => {
    expect(
      newRelicErrors(
        {},
        {
          type: 'NEWRELICERRORS_RECEIVE',
          payload: {
            previous: 10,
            current: 20,
          },
        },
      ),
    ).toEqual({
      previous: 10,
      current: 20,
    });
  });

  it('does not handle other actions', () => {
    expect(
      newRelicErrors(
        {
          previous: 0,
          current: 0,
        },
        {
          type: 'RECEIVE_WEEKNUMBER',
          payload: {
            previous: 9,
            current: 99,
          },
        },
      ),
    ).toEqual({
      previous: 0,
      current: 0,
    });
  });
});
