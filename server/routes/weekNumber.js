var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    status: 'success',
    message: '',
    data: {
      week: 52,
    },
  });
});

module.exports = router;
