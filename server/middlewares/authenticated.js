const passport = require('passport');
const httpStatusCodes = require('../utils/httpStatusCodes');

module.exports = (req, res, next) => {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) return next(err);

        if (!user) {
           return res.status(httpStatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'Unauthorized Access - No Token Provided!',
            });
        }

        req.user = {
            _id: user._id,
        };

        next();
    })(req, res, next);
};
