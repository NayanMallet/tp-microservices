import { Request, Response } from 'express';
import { Database } from 'sqlite';

export function getUsers(db: Database) {
    return async (req: Request, res: Response) => {
        try {
            const users = await db.all('SELECT * FROM users');
            res.json(users);
        } catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export function createUser(db: Database) {
    return async (req: Request, res: Response) => {
        try {
            const { name, email } = req.body;
            const result = await db.run(
                'INSERT INTO users (name, email) VALUES (?, ?)',
                [name, email]
            );
            res.status(201).json({ id: result.lastID, name, email });
        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}
