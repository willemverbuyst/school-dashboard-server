import { Role } from '@prisma/client'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../../config/constants'

export const users = [
	{
		id: 'b12036be-ce84-43f4-89af-8517ebeb25d8',
		email: 'fjodor@dostojewski.com',
		userName: 'Fjodor99',
		role: Role.TEACHER,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
	},
	{
		id: '43a74fe7-af76-46c0-9f37-1b74a55b11ab',
		email: 'sebastian@bach.com',
		userName: 'Sebastian99',
		role: Role.TEACHER,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
	},
	{
		id: 'aeec7218-6246-4294-a577-571f12959640',
		email: 'sifan@hassan.com',
		userName: 'Sifan99',
		role: Role.STUDENT,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
	},
	{
		id: '0988bd08-ace7-4c1d-b0f7-f43014c1cd6e',
		email: 'jack@sparrow.com',
		userName: 'Jack99',
		role: Role.STUDENT,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
	},
	{
		id: '299cbb11-53e0-4af4-b8c7-fea3cca0ec46',
		email: 'john@doe.com',
		userName: 'John99',
		role: Role.STUDENT,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
	},
	{
		id: '49b4bc86-bc9e-4279-b180-e604736ec25b',
		email: 'naomi@klein.com',
		userName: 'Naomi99',
		role: Role.STUDENT,
		password: bcrypt.hashSync('123', SALT_ROUNDS),
	},
]
