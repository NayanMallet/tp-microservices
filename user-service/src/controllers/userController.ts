import { Request, Response } from 'express';
import type { User } from '../types/user';
import type { DB } from '../config';
import { createUserModel } from '../models/userModel';
import { AuthService } from '../services/authService';

export function createUserController(db: DB) {
  const model = createUserModel(db);

  return {
    async list(req: Request, res: Response) {
      const users = await model.getAll();
      res.json(users);
    },

    async register(req: Request, res: Response) {
      const { name, email, password } = req.body;
      if (!name || !email || !password) return res.status(400).json({ error: 'name, email and password are required' });

      const existing = await model.getByEmail(email);
      if (existing) return res.status(409).json({ error: 'Email already registered' });

      const id = AuthService.makeUserId();
      const hashed = await AuthService.hash(password);

      const user: User = { id, name, email, password: hashed };
      await model.create(user);

      const token = AuthService.sign({ id, email });
      res.status(201).json({ id, name, email, token });
    },

    async login(req: Request, res: Response) {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

      const user = await model.getByEmail(email);
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });

      const ok = await AuthService.compare(password, user.password);
      if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

      const token = AuthService.sign({ id: user.id, email: user.email });
      res.json({ token, id: user.id, email: user.email, name: user.name });
    }
  };
}
