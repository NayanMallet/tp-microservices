import { Request, Response } from 'express';
import { Database } from 'sqlite';

export function getItems(db: Database) {
    return async (req: Request, res: Response) => {
        try {
            const items = await db.all('SELECT * FROM items');
            res.json(items);
        } catch (err) {
            console.error('Error fetching items:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export function createItem(db: Database) {
    return async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            if (!name || typeof name !== 'string') {
                return res.status(400).json({ error: 'name is required' });
            }
            const result = await db.run(
                'INSERT INTO items (name) VALUES (?)',
                [name]
            );
            res.status(201).json({ id: result.lastID, name });
        } catch (err) {
            console.error('Error creating item:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}
