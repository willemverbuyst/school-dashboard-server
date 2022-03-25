import { prismaClient } from '../../../prisma'
import { UserPlus } from './models'

export const getUserPlus = async (id: string): Promise<UserPlus | null> => {
	const user = await prismaClient.user.findUnique({
		where: { id },
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
