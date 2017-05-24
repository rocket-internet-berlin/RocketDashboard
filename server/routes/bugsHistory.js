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
          bugs: 3,
        },
        {
          label: 'Tue',
          bugs: 12,
        },
        {
          label: 'Wed',
          bugs: 2,
        },
        {
          label: 'Thu',
          bugs: 10,
        },
        {
          label: 'Fri',
          bugs: 4,
        },
      ],
    },
  });
});

module.exports = router;
