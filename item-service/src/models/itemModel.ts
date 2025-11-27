import type { Database } from 'sqlite';
import type { DB } from '../config';
import type { Item } from '../types/item';

export function createItemModel(db: DB) {
  return {
    async getAll(): Promise<Item[]> {
      const rows = await db.all('SELECT id, name FROM ' + 'items');
      return rows as Item[];
    },

    async create(item: Item): Promise<Item> {
      // store id (UUID) explicitly
      await db.run('INSERT INTO ' + 'items (id, name) VALUES (?, ?)', [item.id, item.name]);
      return item;
    }
  };
}
