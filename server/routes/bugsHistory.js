var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    status: 'success',
    message: '',
    data: {
      period: 'Last 3 Days',
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
