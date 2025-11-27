import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { createCorsMiddleware } from 'shared';
import userRoutes from './routes/userRoutes';
import { setupDb } from './config';

(async () => {
  const app = express();
  const db = await setupDb();
  const PORT = Number(process.env.USER_SERVICE_PORT) || 3002;

  app.use(createCorsMiddleware());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use('/', userRoutes(db));

  app.listen(PORT, () => console.log(`User Service listening on port ${PORT}`));
})();
