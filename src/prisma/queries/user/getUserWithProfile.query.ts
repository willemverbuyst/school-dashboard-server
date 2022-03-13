import { User } from '@prisma/client'
import { prismaClient } from '../../../prisma'
import { UserWithProfile } from './models'

export const getUserWithProfile = async (
	id: string
): Promise<UserWithProfile | null> => {
	const user = await prismaClient.user.findUnique({
		where: { id },
		include: { profile: { select: { bio: true } } },
	})

	if (user) {
		const { password, ...userWithoutPassword } = user
		return userWithoutPassword
	}

	return null
}
