import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';

export const DB_FILE = process.env.USER_DB_FILE || './database.sqlite';
export const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

export async function setupDb(): Promise<Database> {
  const db = await open({ filename: DB_FILE, driver: sqlite3.Database });
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);
  return db;
}

