import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/constant';
import { Student } from '../interfaces/Seeds';

export const students: Student[] = [
  {
    name: 'Sifan Hassan',
    email: 'sifan@hassan.com',
    password: bcrypt.hashSync('123', SALT_ROUNDS),
    createdAt: new Date(),
    updatedAt: new Date(),
    teacherId: 1,
  },
  {
    name: 'Jack Sparrow',
    email: 'jack@sparrow.com',
    password: bcrypt.hashSync('123', SALT_ROUNDS),
    createdAt: new Date(),
    updatedAt: new Date(),
    teacherId: 1,
  },
  {
    name: 'John Doe',
    email: 'john@doe.com',
    password: bcrypt.hashSync('123', SALT_ROUNDS),
    createdAt: new Date(),
    updatedAt: new Date(),
    teacherId: 2,
  },
  {
    name: 'Naomi Klein',
    email: 'naomi@klein.com',
    password: bcrypt.hashSync('123', SALT_ROUNDS),
    createdAt: new Date(),
    updatedAt: new Date(),
    teacherId: 2,
  },
];
