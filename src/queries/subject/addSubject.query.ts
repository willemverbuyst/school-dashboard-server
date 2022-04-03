import { Subject } from '@prisma/client'
import { prismaClient } from '../../prisma'
import { Name } from './models'

export const addSubject = async ({ name }: Name): Promise<Subject | null> => {
	const newSubject = await prismaClient.subject.create({ data: { name } })

	if (newSubject) return newSubject
	return null
}
