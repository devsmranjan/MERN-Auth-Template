const { createProxyMiddleware } = require('http-proxy-middleware');
const { SERVER_URL } = require('./utils/constants');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: SERVER_URL,
            changeOrigin: true,
        })
    );
};
