import { prismaClient } from '../../../prisma'

export const getAllSchools = async () => {
	const schools = await prismaClient.school.findMany()

	return schools
}
