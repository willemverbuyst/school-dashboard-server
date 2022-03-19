import { Subject } from '@prisma/client'
import { prismaClient } from '../../../prisma'

export const getAllSubjects = async (): Promise<Array<Subject>> =>
	await prismaClient.subject.findMany()
