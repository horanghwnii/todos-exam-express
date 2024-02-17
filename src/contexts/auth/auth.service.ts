import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import fs from 'fs/promises';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../config';
import { User } from '../../types/user.type';

class AuthService {
  async signUp(req: Request<{ id: string; password: string }>, res: Response) {
    const { id, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 12);

    const users = await fs
      .readFile('./src/data/users.json', { encoding: 'utf8' })
      .then((text) => JSON.parse(text) as User[]);

    users.push({ id, encryptedPassword });

    const stringifiedNewUsers = JSON.stringify(users);

    await fs.writeFile('./src/data/users.json', stringifiedNewUsers, {
      encoding: 'utf8',
    });

    res.json(encryptedPassword);
  }

  async logIn(req: Request<{ id: string; password: string }>, res: Response) {
    const { id, password } = req.body;

    const users = await fs
      .readFile('./src/data/users.json', { encoding: 'utf8' })
      .then((text) => JSON.parse(text) as User[]);

    const user = users.find((user) => user.id === id);
    if (!user) return res.sendStatus(404);

    const isVerified = bcrypt.compare(password, user.encryptedPassword);
    if (!isVerified) return res.sendStatus(400);

    const accessToken = jwt.sign({ id }, JWT_SECRET_KEY, { subject: id });

    res.json(accessToken);
  }
}

const authService = new AuthService();

export default authService;
