var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.status(400).json({
  //     success: false,
  //     message: 'Invalid email or password',
  // });
  res.status(400).json({
    "message": "Hello"
  })
});

module.exports = router;
