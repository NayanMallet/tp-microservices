import { Application } from 'express';
import proxy from './proxy';

export default (app: Application): void => {
  // Toutes les requêtes débutant par /api passent par le proxy
  app.use('/api', proxy);
};
