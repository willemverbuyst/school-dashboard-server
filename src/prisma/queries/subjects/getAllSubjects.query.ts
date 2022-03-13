import { prismaClient } from '../../../prisma'

export const getAllSubjects = async () => {
	const subjects = await prismaClient.subject.findMany()

	console.log('subjects', subjects)
}
