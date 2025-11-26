import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy: RequestHandler = createProxyMiddleware({
  target: 'http://user-service:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // supprime le préfixe /api
  },
});

export default proxy;
