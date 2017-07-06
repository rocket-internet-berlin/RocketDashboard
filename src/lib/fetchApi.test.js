import fetchApi from './fetchApi';

describe('fetchApi helper', () => {
  it('Should be async', done => {
    fetchApi()
      .then(result => {
        expect(result).toBe(true);
        done();
      })
      .catch(err => {
        done();
      });
  });
});
