// // src/setupProxy.js
 const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',  // 실제 API 서버 주소로 변경
      changeOrigin: true,
    })
  );
  app.use(
    '/api/data',
    createProxyMiddleware({
      target: 'http://localhost:5000',  // 다른 API 서버 주소로 변경
      changeOrigin: true,
    })
  );
};
