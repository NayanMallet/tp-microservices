import 'dotenv/config';
import express, { Application, Request, Response, NextFunction } from 'express';
import { createCorsMiddleware } from 'shared';
import setupRoutes from './routes';

const app: Application = express();
const PORT: number = Number(process.env.GATEWAY_PORT) || 3000;

app.use( createCorsMiddleware() );
app.use(express.json());
setupRoutes(app);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS: Origin not allowed' });
  }
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
