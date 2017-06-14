import express from 'express';
import fetchSheet from '../fetchSheet';

const router = express.Router();

router.get('/', (req, res, next) => {
  // TODO: Refactor to use Promise
  fetchSheet((err, json) => {
    if (err) {
      next(err);
    } else {
      res.json(json);
    }
  });
});

export default router;
