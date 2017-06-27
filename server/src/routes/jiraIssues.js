import express from 'express';
// import config from '../config';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    status: 'success',
    message: '',
    data: { blockers: 10, criticals: 1, others: 2 },
  });
});

export default router;
