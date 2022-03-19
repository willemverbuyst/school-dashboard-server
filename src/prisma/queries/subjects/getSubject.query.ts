import { Subject } from '@prisma/client'
import { prismaClient } from '../../../prisma'

export const getSubject = async (id: string): Promise<Subject | null> =>
	await prismaClient.subject.findUnique({ where: { id } })
