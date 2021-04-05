import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/secrets';

export const toJWT = (data: { teacherId: any }) =>
  jwt.sign(data, jwtSecret, { expiresIn: '2h' });

export const toData = (token: string) => jwt.verify(token, jwtSecret);
