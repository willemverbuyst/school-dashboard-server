import { prismaClient } from '../../../prisma'

export const getUser = async (id: string) => {
	const user = await prismaClient.user.findUnique({
		where: { id },
	})

	return user
}
