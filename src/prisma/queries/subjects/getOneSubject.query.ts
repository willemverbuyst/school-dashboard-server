import { prismaClient } from '../../../prisma'

export const getOneSubject = async (id: string) => {
	const subjects = await prismaClient.subject.findUnique({ where: { id } })

	console.log('subject', subjects)
}
