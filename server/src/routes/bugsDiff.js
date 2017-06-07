import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: '',
    data: {
      lastWeek: 15,
      thisWeek: 13,
    },
  });
});

export default router;
