const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    status: 'success',
    message: '',
    data: {
      period: 'Last 5 Days',
      history: [
        {
          label: 'Mon',
          bugs: 12,
        },
        {
          label: 'Tue',
          bugs: 8,
        },
        {
          label: 'Wed',
          bugs: 9,
        },
        {
          label: 'Thu',
          bugs: 10,
        },
        {
          label: 'Fri',
          bugs: 7,
        },
      ],
    },
  });
});

module.exports = router;
