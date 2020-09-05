const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User.model');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, async function (jwt_payload, done) {
            try {
                let user = await User.findById(jwt_payload.id);

                if (user) return done(null, user);

                done(null, false);
            } catch (error) {
                return done(error, false);
            }
        })
    );
};
