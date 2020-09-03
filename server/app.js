const createError = require('http-errors');

const express = require('express');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

// passport for authentication
const passport = require('passport');
// const authenticate = require('./middlewares/authenticated');

// swagger
const swaggerUI = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// mongo db
const mongoConfig = require('./config/mongo');

// status codes
const httpStatusCodes = require('./utils/httpStatusCodes');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/build')));

// data base
mongoConfig.connectMongo();

// Initialize passport Middleware
app.use(passport.initialize());
// require('./middlewares/jwt')(passport);

app.use('/api', require('./routes/index'));
app.use('/api/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(httpStatusCodes.NOT_FOUND));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // error response
    res.status(err.status || httpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error occurred while handling the request',
        error: err,
    });
});

module.exports = app;
