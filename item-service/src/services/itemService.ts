import type { Database } from 'sqlite';
import { createItemModel } from '../models/itemModel';
import type { Item } from '../types/item';
import { v4 as uuidv4 } from 'uuid';

export function createItemService(db: Database) {
  const model = createItemModel(db);

  return {
    async list(): Promise<Item[]> {
      return model.getAll();
    },

    async create(name: unknown): Promise<Item> {
      if (!name || typeof name !== 'string') throw new Error('name is required');
      const item: Item = { id: uuidv4(), name };
      return model.create(item);
    }
  };
}
