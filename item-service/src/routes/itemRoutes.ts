import { Router } from 'express';
import type { Database } from 'sqlite';
import { getItems, createItem } from '../controllers/itemController';

export default function itemRoutes(db: Database) {
    const router = Router();

    router.get('/items', getItems(db));
    router.post('/items', createItem(db));

    return router;
}
