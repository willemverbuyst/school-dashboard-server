import { prismaClient } from '../../../prisma'

export const getSubject = async (id: string) => {
	const subject = await prismaClient.subject.findUnique({ where: { id } })

	return subject
}
