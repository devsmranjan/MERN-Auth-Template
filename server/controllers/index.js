const httpStatusCodes = require('../utils/httpStatusCodes');

exports.getIndex = (req, res) => {
    res.status(httpStatusCodes.OK).json({
        success: true,
        message: 'Hello! You are at the entry point of the api 😉',
    });
};
