import { Role } from '@prisma/client'
import bcrypt from 'bcrypt'
import { prismaClient } from '../../prisma'
import { SALT_ROUNDS } from '../../config/constants'
import { InputCreateUserTeacher, UserPlus } from './models'

export const createUserTeacher = async ({
	email,
	userName,
	passwordText,
	bsn,
	bio,
	schoolId,
}: InputCreateUserTeacher): Promise<UserPlus | null> => {
	const user = await prismaClient.user.create({
		data: {
			email,
			userName,
			password: bcrypt.hashSync(passwordText, SALT_ROUNDS),
			role: Role.TEACHER,
			bsn,
			profile: {
				create: {
					bio,
				},
			},
			teacher: {
				create: {
					schoolId,
				},
			},
		},
		include: {
			profile: {
				select: {
					bio: true,
				},
			},
			student: {
				select: {
					id: true,
					school: {
						select: {
							name: true,
							location: true,
						},
					},
					teacher: {
						select: {
							id: true,
							user: {
								select: {
									userName: true,
									email: true,
								},
							},
						},
					},
				},
			},
			teacher: {
				select: {
					id: true,
					school: {
						select: {
							name: true,
							location: true,
						},
					},
					students: {
						select: {
							id: true,
							user: {
								select: {
									userName: true,
									email: true,
								},
							},
						},
					},
				},
			},
		},
	})

	if (user) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...userWithoutPassword } = user
		return userWithoutPassword
	}
	return null
}
