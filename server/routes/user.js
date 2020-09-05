const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

//  get user
router.get('/', User.getUser);

module.exports = router;
