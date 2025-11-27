import path from 'path';
import fs from 'fs';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export type DB = any;

export const DB_FILE = process.env.ITEM_DB_FILE || path.resolve(__dirname, '../../database.sqlite');

export async function setupDb(): Promise<DB> {
  console.log('Item-service using DB_FILE=', DB_FILE);
  const dir = path.dirname(DB_FILE);
  try {
    fs.mkdirSync(dir, { recursive: true });
    // ensure file exists
    try { fs.openSync(DB_FILE, 'a'); } catch (e) { /* ignore */ }
  } catch (err) {
    console.error('Failed to prepare DB file/dir:', err);
  }

  const db = await open({ filename: DB_FILE, driver: sqlite3.Database });
  await db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      name TEXT
    )
  `);
  return db;
}
