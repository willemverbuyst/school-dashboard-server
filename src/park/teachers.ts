import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/constant';
import { Teacher } from '../interfaces/Seeds';

export const teachers: Teacher[] = [
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
