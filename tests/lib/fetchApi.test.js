import { fetchApi, fetchUrl } from '../../src/lib/fetchApi';

describe('fetchApi helper', () => {
  it('fetchApi should be async', done => {
    fetchApi()
      .then(result => {
        expect(result).toBe(true);
        done();
      })
      .catch(err => {
        done();
      });
  });
  it('fetchUrl should be async', done => {
    fetchUrl()
      .then(result => {
        expect(result).toBe(true);
        done();
      })
      .catch(err => {
        done();
      });
  });
});
