const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = createProxyMiddleware({
    target: 'http://public-api:3001',  // nom du service docker-compose
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''  // supprime /api du chemin final
    }
});
