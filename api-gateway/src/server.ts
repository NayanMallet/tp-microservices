import express, { Application, Request, Response, NextFunction } from 'express';
import setupRoutes from './routes';

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

// Middlewares & routes
setupRoutes(app);

// middleware d’erreur
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
