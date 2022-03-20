import { Role } from '@prisma/client'
import bcrypt from 'bcrypt'
import { prismaClient } from '../../../prisma'
import { SALT_ROUNDS } from '../../../config/constants'
import { UserPlus } from './models'

export const createUserTeacher = async (
	email: string,
	userName: string,
	password: string,
	bio: string,
	schoolId: string
): Promise<UserPlus | null> => {
	const user = await prismaClient.user.create({
		data: {
			email,
			userName,
			password: bcrypt.hashSync(password, SALT_ROUNDS),
			role: Role.TEACHER,
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
		const { password, ...userWithoutPassword } = user
		return userWithoutPassword
	}
	return null
}