const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const EmailVerificationToken = require('./EmailVerificationToken.model');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: 'Your email is required',
            trim: true,
        },
        username: {
            type: String,
            unique: true,
            required: 'Your username is required',
            trim: true,
        },
        password: {
            type: String,
            required: 'Your password is required',
            min: 6,
        },
        name: {
            type: String,
            required: 'Name is required',
            max: 100,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: {
            type: String,
            required: false,
        },
        resetPasswordExpires: {
            type: Date,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

// Convert Password to hash before save
userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

// Check password is correct or not
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// generate JWT token
userSchema.methods.generateJWT = function () {
    let payload = {
        id: this._id,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// Generate email verfication token
userSchema.methods.generateEmailVerificationToken = function () {
    let payload = {
        userId: this._id,
        token: crypto.randomBytes(20).toString('hex'),
    };

    return new EmailVerificationToken(payload);
};

// Generate token and expire time for password reset
userSchema.methods.generatePasswordReset = function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

module.exports = mongoose.model('User', userSchema);
