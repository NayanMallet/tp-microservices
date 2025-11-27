import { Router } from 'express';
import type { Database } from 'sqlite';
import { createUserController } from '../controllers/userController';
import { requireAuth } from '../middlewares/authMiddleware';

export default function userRoutes(db: Database) {
  const router = Router();
  const controller = createUserController(db);

  router.get('/users', requireAuth, controller.list.bind(controller));
  router.post('/users', controller.register.bind(controller));
  router.post('/login', controller.login.bind(controller));

  return router;
}

