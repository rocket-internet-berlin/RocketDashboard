import express from 'express';

const router = express.Router();

const getWeekNumber = () => {
  const today = new Date();
  const day = (today.getDay() + 6) % 7;
  today.setDate((today.getDate() - day) + 3);
  const firstThursday = today.valueOf();
  today.setMonth(0, 1);
  if (today.getDay() !== 4) {
    today.setMonth(0, 1 + (((4 - today.getDay()) + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - today) / 604800000);
};

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: '',
    data: {
      week: getWeekNumber(),
    },
  });
});

export default router;
