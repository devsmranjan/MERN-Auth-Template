const express = require('express');
const router = express.Router();
const User = require('../controllers/user');
const validate = require('../middlewares/validate');
const { check } = require('express-validator');

//  get user
router.get('/', User.getUser);

// Update profile details
router.put('/update', User.updateProfileDetails);

// Update password
router.put(
    '/updatePassword',
    [
        check('newPassword')
            .not()
            .isEmpty()
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 chars long'),
    ],
    validate,
    User.updatePassword
);

// Delete Account
router.delete('/deleteAccount', User.deleteAccount);

module.exports = router;
