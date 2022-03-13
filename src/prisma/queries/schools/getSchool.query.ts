import { prismaClient } from '../../../prisma'

export const getSchool = async (id: string) => {
	const school = await prismaClient.school.findUnique({ where: { id } })

	return school
}
