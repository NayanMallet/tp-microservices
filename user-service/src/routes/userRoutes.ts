import { Router } from 'express';
import type { DB } from '../config';
import { createUserController } from '../controllers/userController';

export default function userRoutes(db: DB) {
  const router = Router();
  const controller = createUserController(db);

  // Allow listing users without auth in the dev playground.
  // Previously this route required authentication which made frontend requests
  // return 401 when no token was provided.
  router.get('/users', controller.list.bind(controller));
  router.post('/users', controller.register.bind(controller));
  router.post('/login', controller.login.bind(controller));

  return router;
}
