import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/secrets';

export const toJWT = (data: { [key: string]: any }): string =>
  jwt.sign(data, jwtSecret, { expiresIn: '2h' });

export const toData = (token: string): string | object =>
  jwt.verify(token, jwtSecret);
