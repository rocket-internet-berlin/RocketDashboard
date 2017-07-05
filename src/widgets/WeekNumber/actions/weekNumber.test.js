import onReceive from '../../Number/actions/number';

describe('weekNumber refresh action', () => {
  const actual = onReceive('weekNumber', 9);
  const expected = { type: 'RECEIVE_NUMBER', payload: { key: 'weekNumber', current: 9 } };

  it('creates a correct action', () => {
    expect(actual).toEqual(expected);
  });
});
