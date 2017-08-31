import { cacheService } from '../service';
import { getResponseSuccess } from '../helper/responseHelper';

const createCachedRouterCallback = (fetchFunction, cacheKeyTTL = null) => {
  if (typeof fetchFunction !== 'function') {
    throw Error('Invalid parameter provided: "fetchFunction" is expected to be a function definition. It should return a Promise.');
  }
  return (req, res, next) => {
    const cacheKey = req.originalUrl;

    const callback = (err, result) => {
      const cachedPayload = JSON.parse(result);

      if (cachedPayload) {
        res.json(getResponseSuccess(cachedPayload));
        return;
      }

      fetchFunction()
        .then(payload => {
          cacheService.set(cacheKey, payload, cacheKeyTTL);
          res.json(getResponseSuccess(payload));
        })
        .catch(error => next(error));
    };

    cacheService.get(cacheKey, callback);
  };
};

export default createCachedRouterCallback;
