import { Role, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { SALT_ROUNDS } from '../../config/constants'

export const userStudents: Array<User> = [
	{
		id: uuidv4(),
		email: 'sifan@hassan.com',
		userName: 'Sifan99',
		role: Role.STUDENT,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
	},
	{
		id: uuidv4(),
		email: 'jack@sparrow.com',
		userName: 'Jack99',
		role: Role.STUDENT,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
	},
	{
		id: uuidv4(),
		email: 'john@doe.com',
		userName: 'John99',
		role: Role.STUDENT,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
	},
	{
		id: uuidv4(),
		email: 'naomi@klein.com',
		userName: 'Naomi99',
		role: Role.STUDENT,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
	},
]

export const userTeachers: Array<User> = [
	{
		id: uuidv4(),
		email: 'fjodor@dostojewski.com',
		userName: 'Fjodor99',
		role: Role.TEACHER,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
	},
	{
		id: uuidv4(),
		email: 'sebastian@bach.com',
		userName: 'Sebastian99',
		role: Role.TEACHER,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
	},
]
