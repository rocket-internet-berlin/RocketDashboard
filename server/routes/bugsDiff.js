var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    status: 'success',
    message: '',
    data: {
      lastWeek: 15,
      thisWeek: 13,
    },
  });
});

module.exports = router;
