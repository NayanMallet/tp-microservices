import type { Database } from 'sqlite';
import type { User } from '../types/user';

export function createUserModel(db: Database) {
  return {
    async getAll(): Promise<Omit<User, 'password'>[]> {
      const rows = await db.all('SELECT id, name, email FROM users');
      return rows as Omit<User, 'password'>[];
    },

    async getByEmail(email: string): Promise<User | undefined> {
      const row = await db.get('SELECT id, name, email, password FROM users WHERE email = ?', [email]);
      return row as User | undefined;
    },

    async create(user: User): Promise<void> {
      await db.run(
        'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
        [user.id, user.name, user.email, user.password]
      );
    }
  };
}

