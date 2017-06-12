import express from 'express';
import fetchSheet from '../fetchSheet';

const router = express.Router();

router.get('/', (req, res) => {
  fetchSheet((success, json) => {
    if (success) {
      res.json(json);
    } else {
      res.status(500).send('Sorry, something went wrong');
    }
  });
});

export default router;
