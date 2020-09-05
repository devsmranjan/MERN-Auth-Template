const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const validate = require('../middlewares/validate');
const apiEndpoints = require('../utils/apiEndpoints');
const Auth = require('../controllers/auth');

// auth endpoint
router.get('/', Auth.authEndpoint);

// Sign up a new user
router.post(
    apiEndpoints.AUTH_SIGNUP,
    [
        check('email').isEmail().withMessage('Enter a valid email address'),
        check('username')
            .not()
            .isEmpty()
            .withMessage('You username is required'),
        check('password')
            .not()
            .isEmpty()
            .isLength({ min: 6 })
            .withMessage('Must be at least 6 chars long'),
        check('name').not().isEmpty().withMessage('You name is required'),
    ],
    validate,
    Auth.signUp
);

// Login
router.post(
    apiEndpoints.AUTH_LOGIN,
    [
        check('email').isEmail().withMessage('Enter a valid email address'),
        check('password').not().isEmpty(),
    ],
    validate,
    Auth.logIn
);

// Verify - EMAIL Verification
router.get(apiEndpoints.AUTH_VERIFY_EMAIL, Auth.verifyEmail);
router.post(
    apiEndpoints.AUTH_VERIFY_EMAIL_RESEND,
    Auth.resendEmailVerificationToken
);

// Recover - When user click for recover poassword
router.post(
    apiEndpoints.AUTH_RECOVER,
    [check('email').isEmail().withMessage('Enter a valid email address')],
    validate,
    Auth.recoverPassword
);

// Reset GET - When user give a get request to the reset link
router.get(apiEndpoints.AUTH_CHECK_RESET_LINK, Auth.checkResetPasswordLink);

// Reset POST - When user click submit button to update password
router.post(
    apiEndpoints.AUTH_RESET,
    [
        check('password')
            .not()
            .isEmpty()
            .isLength({ min: 6 })
            .withMessage('Must be at least 6 chars long'),
        check('confirmPassword', 'Passwords do not match').custom(
            (value, { req }) => value === req.body.password
        ),
    ],
    validate,
    Auth.resetPassword
);

module.exports = router;
