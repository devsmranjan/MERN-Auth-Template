const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

//  get user
router.get('/', User.getUser);

// Update profile details
router.put('/update', User.updateProfileDetails);

// Update password
router.put('/updatePassword', User.updatePassword);

// Delete Account
router.delete('/deleteAccount', User.deleteAccount);

module.exports = router;
