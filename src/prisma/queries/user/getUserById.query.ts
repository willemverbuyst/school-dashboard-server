import { prismaClient } from '../../../prisma'
import { UserWithIds } from './models'

export const getUserById = async (id: string): Promise<UserWithIds | null> => {
	const user = await prismaClient.user.findUnique({
		where: { id },
		include: {
			student: {
				select: {
					id: true,
				},
			},
			teacher: {
				select: {
					id: true,
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
