import onReceive from '../../Number/actions/number';

describe('weekNumber refresh action', () => {
  const actual = onReceive('someKey', 9, 99);
  const expected = { type: 'RECEIVE_NUMBER', payload: { key: 'someKey', current: 9, previous: 99 } };

  it('creates a correct action', () => {
    expect(actual).toEqual(expected);
  });
});
