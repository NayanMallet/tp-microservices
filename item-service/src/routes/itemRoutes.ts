import { Router } from 'express';
import type { Database } from 'sqlite';
import { createItemController } from '../controllers/itemController';

export default function itemRoutes(db: Database) {
  const router = Router();
  const controller = createItemController(db);

  router.get('/items', controller.list.bind(controller));
  router.post('/items', controller.create.bind(controller));

  return router;
}

