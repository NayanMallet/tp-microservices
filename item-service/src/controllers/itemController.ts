import { Request, Response } from 'express';
import type { DB } from '../config';
import { createItemService } from '../services/itemService';

export function createItemController(db: DB) {
  const service = createItemService(db);

  return {
    async list(req: Request, res: Response) {
      try {
        const items = await service.list();
        res.json(items);
      } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    async create(req: Request, res: Response) {
      try {
        const { name } = req.body;
        const item = await service.create(name);
        res.status(201).json(item);
      } catch (err: any) {
        if (err.message === 'name is required') return res.status(400).json({ error: 'name is required' });
        console.error('Error creating item:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}
