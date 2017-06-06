import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    status: 'success',
    message: '',
    data: {
      week: 52,
    },
  });
});

export default router;
