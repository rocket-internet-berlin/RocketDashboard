const express = require('express');
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

module.exports = router;
