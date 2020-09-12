const { validationResult } = require('express-validator');
const httpStatusCodes = require('../utils/httpStatusCodes');

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let error = {};

        errors.array().map((err) => (error[err.param] = err.msg));
        return res.status(httpStatusCodes.UNPROCESSABLE_ENTITY).json({
            success: false,
            message: '',
            error: error,
        });
    }

    next();
};
