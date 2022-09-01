import { Role, User } from '@prisma/client'
import { SALT_ROUNDS } from '../../src/config/constants'
import bcrypt = require('bcrypt')

export const userStudents: Array<User> = [
	{
		id: 'd9954384-89f2-4de1-a4cd-1bbb5c3a5b92',
		email: 'test@student.com',
		userName: 'test_student',
		role: Role.STUDENT,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
		bsn: '999996575',
	},
]

export const userTeachers: Array<User> = [
	{
		id: 'd8506c42-bdff-46fb-b0f6-679f1ee22961',
		email: 'test@teacher.com',
		userName: 'test_teacher',
		role: Role.TEACHER,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
		bsn: '999990469',
	},
]
