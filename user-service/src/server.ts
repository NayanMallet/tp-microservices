import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { createCorsMiddleware } from 'shared';
import userRoutes from './routes/userRoutes';

async function setupDb(): Promise<Database> {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
    await db.run(`
        CREATE TABLE IF NOT EXISTS users (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             name TEXT,
             email TEXT
        )
    `);
    return db;
}

(async () => {
    const app = express();
    const db = await setupDb();
    const PORT = Number(process.env.USER_SERVICE_PORT) || 3002;

    app.use( createCorsMiddleware() );
    app.use(express.json());
    app.use(morgan('dev'));
    app.use('/', userRoutes(db));

    app.listen(PORT, () => {
        console.log(`User Service listening on port ${PORT}`);
    });
})();
