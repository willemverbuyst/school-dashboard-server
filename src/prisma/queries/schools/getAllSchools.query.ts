import { School } from '@prisma/client'
import { prismaClient } from '../../../prisma'

export const getAllSchools = async (): Promise<Array<School>> =>
	await prismaClient.school.findMany()
