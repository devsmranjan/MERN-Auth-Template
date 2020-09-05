const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const User = require('../models/User.model');
const EmailVerificationToken = require('../models/EmailVerificationToken.model');
const httpStatusCodes = require('../utils/httpStatusCodes');
const messages = require('../utils/messages');

// auth endpoint
exports.authEndpoint = (req, res) => {
    res.status(httpStatusCodes.OK).json({
        success: true,
        message: messages.SUCCESS_AUTH_ENDPOINT,
    });
};

// Sign Up
exports.signUp = async (req, res) => {
    try {
        const { email, username } = req.body;

        // check email is exist or not
        const userByEmail = await User.findOne({ email });

        if (userByEmail) {
            return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                message: messages.EMAIL_ALREADY_EXIST,
            });
        }

        // check username is exist or not
        const userByUsername = await User.findOne({ username });
        if (userByUsername) {
            return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                message: messages.USERNAME_ALREADY_EXIST,
            });
        }

        const newUser = await new User({ ...req.body }).save();

        // send email for verification
        sendEmail(newUser, req, res);
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: messages.INTERNAL_SERVER_ERROR,
            error: error,
        });
    }
};

// Log In
exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check account is exist or not
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                message: messages.INVALID_EMAIL_OR_PASSWORD,
            });
        }

        //validate password
        if (!user.comparePassword(password))
            return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                message: messages.INVALID_EMAIL_OR_PASSWORD,
            });

        // Make sure the user has been verified
        if (!user.isVerified)
            return res.status(httpStatusCodes.UNAUTHORIZED).json({
                type: 'not-verified',
                success: false,
                message: messages.ACCOUNT_NOT_VERIFIED,
            });

        // Login successful, write token, and send back user
        res.status(httpStatusCodes.OK).json({
            success: true,
            data: {
                token: user.generateJWT(),
                user: user,
            },
        });
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: messages.INTERNAL_SERVER_ERROR,
            error: error,
        });
    }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
    if (!req.params.token) {
        return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
            success: false,
            message: messages.UNABLE_TO_VERIFY,
        });
    }

    try {
        // Find a matching token
        const token = await EmailVerificationToken.findOne({
            token: req.params.token,
        });

        if (!token) {
            return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                message: messages.UNABLE_TO_VERIFY,
            });
        }

        const user = await User.findOne({ _id: token.userId });

        if (!user) {
            return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                message: messages.UNABLE_TO_VERIFY,
            });
        }

        // Check whether the user already verified or not
        if (user.isVerified) {
            return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                message: messages.ACCOUNT_VERIFIED_ALREADY,
            });
        }

        // Verify and save the user
        user.isVerified = true;
        await user.save();

        res.status(httpStatusCodes.OK).send({
            success: true,
            message: messages.SUCCESS_ACCOUNT_VERIFIED,
        });
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: messages.INTERNAL_SERVER_ERROR,
            error: error,
        });
    }
};

// Resend Email Verification token
exports.resendEmailVerificationToken = async (req, res) => {
    try {
        const { email } = req.body;

        // Check user available or not
        const user = await User.findOne({ email });

        // If user not available
        if (!user) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                success: false,
                message: messages.EMAIL_NOT_EXIIST,
            });
        }

        // If user has already been verified
        if (user.isVerified) {
            return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                message: messages.ACCOUNT_VERIFIED_ALREADY,
            });
        }

        // Else send mail with verification link
        sendEmail(user, req, res);
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: messages.INTERNAL_SERVER_ERROR,
            error: error,
        });
    }
};

// PASSWORD
// Recover - When user click for recover poassword
exports.recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                success: false,
                message: messages.EMAIL_NOT_EXIIST,
            });
        }

        user.generatePasswordReset();

        // Save upadted user object
        await user.save();

        // send email
        let passwordResetLink =
            req.protocol +
            '://' +
            req.headers.host +
            '/api/auth/reset/' +
            user.resetPasswordToken;

        const mailOptions = {
            to: user.email,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject: 'Password change request',
            text: `Hi ${user.username} \n\nPlease click on the following link ${passwordResetLink} to reset your password. \n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await sgMail.send(mailOptions);

        res.status(httpStatusCodes.OK).json({
            success: true,
            message: 'A reset email link has been sent to ' + user.email,
        });
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: messages.INTERNAL_SERVER_ERROR,
            error: error,
        });
    }
};

// Reset GET - When user give a get request to the reset link
exports.checkResetPasswordLink = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                success: false,
                message: messages.PASSWORD_TOKEN_INVALID,
            });
        }

        res.status(httpStatusCodes.OK).json({
            success: true,
            data: {
                token: token,
            },
        });
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: messages.INTERNAL_SERVER_ERROR,
            error: error,
        });
    }
};

// Reset POST - When user click submit button to update password
exports.resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                success: false,
                message: messages.PASSWORD_TOKEN_INVALID,
            });
        }

        //Set the new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.isVerified = true;

        await user.save();

        // send email
        const mailOptions = {
            to: user.email,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject: 'Your password has been changed',
            text: `Hi ${user.username} \n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`,
        };

        sgMail.send(mailOptions);

        res.status(httpStatusCodes.OK).json({
            success: true,
            message: messages.SUCCESS_PASSWORD_UPDATE,
        });
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: messages.INTERNAL_SERVER_ERROR,
            error: error,
        });
    }
};

// Send mail with verfication link
const sendEmail = async (user, req, res) => {
    const emailVerficationToken = user.generateEmailVerificationToken();

    // Save the verfication token
    try {
        await emailVerficationToken.save();

        const verficationURL =
            req.protocol +
            '://' +
            req.headers.host +
            '/api/auth/verify/' +
            emailVerficationToken.token;

        const mailOptions = {
            to: user.email,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject: 'Account Verification Token',
            text: `Hi ${user.username}\n\nPlease click on the following link ${verficationURL} to verify your account.\n\nIf you did not request this, please ignore this email.\n`,
        };

        await sgMail.send(mailOptions);
        res.status(httpStatusCodes.OK).json({
            success: true,
            message: 'A verification email has been sent to ' + user.email,
        });
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: messages.INTERNAL_SERVER_ERROR,
            error: error,
        });
    }
};
