const express = require('express');
const router = express.Router();
const User = require('../controllers/user');
const validate = require('../middlewares/validate');
const { check } = require('express-validator');
const apiEndpoints = require('../utils/apiEndpoints');

//  get user
router.get('/', User.getUser);

// Update profile details
router.put(apiEndpoints.USER_UPDATE, User.updateProfileDetails);

// Update password
router.put(
    apiEndpoints.USER_UPDATE_PASSWORD,
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
router.delete(apiEndpoints.USER_DELETE_ACCOUNT, User.deleteAccount);

module.exports = router;
