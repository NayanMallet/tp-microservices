import express, { Request, Response } from 'express';
const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.get('/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from public API' });
});

app.listen(PORT, () => {
  console.log(`Public API listening on port ${PORT}`);
});
