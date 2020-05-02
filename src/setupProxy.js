const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/kcs2',
    createProxyMiddleware({
      target: 'http://localhost:3030',
      changeOrigin: true,
    })
  ).use(
    '/gadget_html5',
    createProxyMiddleware({
      target: 'http://localhost:3030',
      changeOrigin: true,
    })
  ).use(
    '/html',
    createProxyMiddleware({
      target: 'http://localhost:3030',
      changeOrigin: true,
    })
  ).use(
    '/kcscontents',
    createProxyMiddleware({
      target: 'http://localhost:3030',
      changeOrigin: true,
    })
  ).use(
    '/kcs',
    createProxyMiddleware({
      target: 'http://localhost:3030',
      changeOrigin: true,
    })
  ).use(
    '/kcsapi',
    createProxyMiddleware({
      target: 'http://localhost:3030',
      changeOrigin: true,
    })
  );
};