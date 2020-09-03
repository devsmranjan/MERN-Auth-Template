import { constants } from './utils/constants';
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: constants.SERVER_URL,
            changeOrigin: true,
        })
    );
};
