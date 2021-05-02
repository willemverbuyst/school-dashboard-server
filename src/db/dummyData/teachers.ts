import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/constant';
import { User } from '../interfaces/Seeds';

export const teachers: User[] = [
  {
    name: 'Fjodor Dostojewski',
    email: 'fjodor@dostojewski.com',
    password: bcrypt.hashSync('123', SALT_ROUNDS),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Sebastian Bach',
    email: 'sebastian@bach.com',
    password: bcrypt.hashSync('123', SALT_ROUNDS),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
