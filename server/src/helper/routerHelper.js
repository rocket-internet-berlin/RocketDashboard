import { cacheService } from '../service';
import { getResponseSuccess } from '../helper/responseHelper';

const createCachedRouterCallback = fetchFunction => {
  if (typeof fetchFunction !== 'function') {
    throw Error('Invalid parameter provided: "fetchFunction" is expected to be a function definition.');
  }
  return (req, res, next) => {
    const cacheKey = req.originalUrl;
    const cachedPayload = cacheService.get(cacheKey);

    if (cachedPayload) {
      res.json(getResponseSuccess(cachedPayload));
      return;
    }

    fetchFunction()
      .then(payload => {
        cacheService.set(cacheKey, payload);
        res.json(getResponseSuccess(payload));
      })
      .catch(err => next(err));
  };
};

export default createCachedRouterCallback;
