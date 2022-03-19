import { User } from '@prisma/client'
import { prismaClient } from '../../../prisma'

export const getUserById = async (id: string): Promise<User | null> =>
	await prismaClient.user.findUnique({
		where: { id },
	})
