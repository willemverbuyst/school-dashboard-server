import { Role, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import { generateBSN } from 'bsn-js'
import { SALT_ROUNDS } from '../../config/constants'

export const userStudents: Array<User> = Array(8)
  .fill(0)
  .map(() => ({
    id: uuidv4(),
    email: faker.internet.email(),
    userName: faker.internet.userName(),
    role: Role.STUDENT,
    password: bcrypt.hashSync('123', SALT_ROUNDS),
    bsn: generateBSN(),
  }))

export const userTeachers: Array<User> = Array(4)
  .fill(0)
  .map(() => ({
    id: uuidv4(),
    email: faker.internet.email(),
    userName: faker.internet.userName(),
    role: Role.TEACHER,
    password: bcrypt.hashSync('123', SALT_ROUNDS),
    bsn: generateBSN(),
  }))
