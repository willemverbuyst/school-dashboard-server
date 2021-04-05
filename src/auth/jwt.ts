import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/secrets';

function toJWT(data: string) {
  return jwt.sign(data, jwtSecret, { expiresIn: '2h' });
}

function toData(token: string) {
  return jwt.verify(token, jwtSecret);
}

module.exports = { toJWT, toData };
