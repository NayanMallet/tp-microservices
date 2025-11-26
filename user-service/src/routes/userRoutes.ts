import { Router } from 'express';
import type { Database } from 'sqlite';
import { getUsers, createUser } from '../controllers/userController';

export default function userRoutes(db: Database) {
    const router = Router();

    router.get('/users', getUsers(db));
    router.post('/users', createUser(db));

    return router;
}
