const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://pink-witty-jellyfish.cyclic.app",
      changeOrigin: true,
    })
  );
};
