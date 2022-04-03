import { Role, User } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { SALT_ROUNDS } from '../../src/config/constants'
const bcrypt = require('bcrypt')

export const userStudents: Array<User> = [
	{
		id: uuidv4(),
		email: 'test@students.com',
		userName: 'test_student',
		role: Role.STUDENT,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
		bsn: '000000000',
	},
]

export const userTeachers: Array<User> = [
	{
		id: uuidv4(),
		email: 'test@teacher.com',
		userName: 'test_teacher',
		role: Role.TEACHER,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
		bsn: '999999999',
	},
]
