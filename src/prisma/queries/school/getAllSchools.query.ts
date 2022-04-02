import { School } from '@prisma/client'
import { prismaClient } from '../../../prisma'

export const getAllSchools = async (): Promise<Array<School>> => {
	const schools = await prismaClient.school.findMany()

	return schools
}
