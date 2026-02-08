const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    console.log('프록시 작동중입니다.');
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8181',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        })
    );
};