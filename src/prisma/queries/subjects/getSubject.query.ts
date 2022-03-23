import { Subject } from '@prisma/client'
import prismaClient from '../../../prisma'

const getSubject = async (id: string): Promise<Subject | null> => {
	const subject = await prismaClient.subject.findUnique({ where: { id } })

	if (subject) return subject
	return null
}

export default getSubject
