import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { createCorsMiddleware } from 'shared';
import itemRoutes from './routes/itemRoutes';

async function setupDb(): Promise<Database> {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
    await db.run(`
        CREATE TABLE IF NOT EXISTS items (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             name TEXT
        )
    `);
    return db;
}

(async () => {
    const app = express();
    const db = await setupDb();
    const PORT = Number(process.env.ITEM_SERVICE_PORT) || 3003;

    app.use( createCorsMiddleware() );
    app.use(express.json());
    app.use(morgan('dev'));
    app.use('/', itemRoutes(db));

    app.listen(PORT, () => {
        console.log(`Item Service listening on port ${PORT}`);
    });
})();
