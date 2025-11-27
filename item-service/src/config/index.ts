import path from 'path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export type DB = any;

export const DB_FILE = process.env.ITEM_DB_FILE || path.resolve(__dirname, '../../database.sqlite');

export async function setupDb(): Promise<DB> {
  const db = await open({ filename: DB_FILE, driver: sqlite3.Database });
  await db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      name TEXT
    )
  `);
  return db;
}
