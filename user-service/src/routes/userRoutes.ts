import { Router } from 'express';
import type { DB } from '../config';
import { createUserController } from '../controllers/userController';
import { requireAuth } from '../middlewares/authMiddleware';

export default function userRoutes(db: DB) {
  const router = Router();
  const controller = createUserController(db);

  router.get('/users', requireAuth, controller.list.bind(controller));
  router.post('/users', controller.register.bind(controller));
  router.post('/login', controller.login.bind(controller));

  return router;
}
