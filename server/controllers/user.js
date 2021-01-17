const bcrypt = require('bcrypt');

const httpStatusCodes = require('../utils/httpStatusCodes');

const User = require('../models/User.model');
const messages = require('../utils/messages');

exports.getUser = async (req, res) => {
    try {
        const { _id } = req.user;

        const userById = await User.findById({ _id });

        if (!userById) {
            return res.status(httpStatusCodes.UNAUTHORIZED).json({
                success: false,
                message: messages.USER_NOT_AVAILABLE,
            });
        }

        const userData = {
            id: userById.id,
            name: userById.name,
            email: userById.email,
            username: userById.username,
        };

        res.status(httpStatusCodes.OK).json({
            success: true,
            user: userData,
        });
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: messages.INTERNAL_SERVER_ERROR,
            error: error,
        });
    }
};

// Update profile details
exports.updateProfileDetails = async (req, res) => {
    try {
        const { _id } = req.user;

        const userById = await User.findById({ _id });

        if (!userById) {
            return res.status(httpStatusCodes.UNAUTHORIZED).json({
                success: false,
                message: messages.USER_NOT_AVAILABLE,
            });
        }

        userById.name = req.body.name ? req.body.name : userById.name;
        await userById.save();

        const userData = {
            id: userById.id,
            name: userById.name,
            email: userById.email,
            username: userById.username,
        };

        res.status(httpStatusCodes.OK).json({
            success: true,
            message: messages.SUCCESS_PROFILE_UPDATED,
            user: userData,
        });
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: messages.INTERNAL_SERVER_ERROR,
            error: error,
        });
    }
};

// Update password
exports.updatePassword = async (req, res) => {
    try {
        const { _id } = req.user;

        const userById = await User.findById({ _id });

        if (!userById) {
            return res.status(httpStatusCodes.UNAUTHORIZED).json({
                success: false,
                message: messages.USER_NOT_AVAILABLE,
            });
        }

        let { currentPassword, newPassword } = req.body;

        let isPasswordMatched = await bcrypt.compare(
            currentPassword,
            userById.password
        );

        if (!isPasswordMatched) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({
                success: false,
                message: messages.PASSWORD_DOESNT_MATCH,
            });
        }

        userById.password = newPassword;

        await userById.save();

        const userData = {
            id: userById.id,
            name: userById.name,
            email: userById.email,
            username: userById.username,
        };

        res.status(httpStatusCodes.OK).json({
            success: true,
            message: messages.SUCCESS_PASSWORD_UPDATE,
            user: userData,
        });
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: messages.INTERNAL_SERVER_ERROR,
            error: error,
        });
    }
};

// Delete Account
exports.deleteAccount = async (req, res) => {
    try {
        const { _id } = req.user;

        const userById = await User.findById({ _id });

        if (!userById) {
            return res.status(httpStatusCodes.UNAUTHORIZED).json({
                success: false,
                message: messages.USER_NOT_AVAILABLE,
            });
        }

        await userById.deleteOne();

        res.status(httpStatusCodes.OK).json({
            success: true,
            message: messages.SUCCESS_ACCOUNT_DELETE,
        });
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: messages.INTERNAL_SERVER_ERROR,
            error: error,
        });
    }
};
