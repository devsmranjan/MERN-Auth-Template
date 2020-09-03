var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.status(400).json({
        success: false,
        message: 'Invalid User',
    });
});

module.exports = router;
