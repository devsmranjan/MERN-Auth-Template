// import { Constants } from './utils/constants';
import Constants from './utils/constants';
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: Constants.SERVER_URL,
            changeOrigin: true,
        })
    );
};
