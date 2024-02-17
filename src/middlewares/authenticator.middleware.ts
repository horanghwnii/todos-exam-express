import { NextFunction, Request, Response } from 'express';
import fs from 'fs/promises';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config';
import { User } from '../types/user.type';

const freePassRoutes = ['/auth/sign-up', '/auth/log-in'];

export default async function authenticator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (freePassRoutes.includes(req.url)) return next();

  const accessToken = req.headers.authorization?.split('Bearer ')[1];
  console.log(accessToken);
  if (!accessToken) return res.sendStatus(401);

  try {
    const users = await fs
      .readFile('./src/data/users.json', { encoding: 'utf8' })
      .then((text) => JSON.parse(text) as User[]);

    const { sub: id } = jwt.verify(accessToken, JWT_SECRET_KEY);

    const user = users.find((user) => user.id === id);
    if (!user) return res.sendStatus(404);

    req.user = user;
  } catch (e) {
    return res.sendStatus(401);
  }

  next();
}
