import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy: RequestHandler = createProxyMiddleware({
  target: 'http://public-api:3001', // nom du service Docker-Compose
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // supprime le préfixe /api
  },
});

export default proxy;
