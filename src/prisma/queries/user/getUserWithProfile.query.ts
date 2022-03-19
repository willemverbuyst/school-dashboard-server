import { prismaClient } from '../../../prisma'
import { UserWithProfile } from './models'

export const getUserWithProfile = async (
	id: string
): Promise<UserWithProfile | null> =>
	await prismaClient.user.findUnique({
		where: { id },
		include: { profile: { select: { bio: true } } },
	})
