import { prismaClient } from '../../../prisma'
import { UserWithIds } from './models'

export const getUserById = async (id: string): Promise<UserWithIds | null> =>
	await prismaClient.user.findUnique({
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
