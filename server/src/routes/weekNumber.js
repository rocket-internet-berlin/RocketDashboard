import express from 'express';
import moment from 'moment';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: '',
    data: {
      week: moment().format('w'),
    },
  });
});

export default router;
