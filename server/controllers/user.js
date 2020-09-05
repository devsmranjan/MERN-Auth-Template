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

        res.status(httpStatusCodes.OK).json({
            success: true,
            data: {
                user: userById,
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
