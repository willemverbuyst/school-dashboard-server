import { prismaClient } from '../../../prisma'
import { UserWithoutPassword } from './models'

export const getUser = async (
	id: string
): Promise<UserWithoutPassword | null> => {
	const user = await prismaClient.user.findUnique({
		where: { id },
	})

	if (user) {
		const { password, ...userWithoutPassword } = user
		return userWithoutPassword
	}

	return null
}