import { School } from '@prisma/client'
import prismaClient from '../../../prisma'

const getSchool = async (id: string): Promise<School | null> => {
	const school = await prismaClient.school.findUnique({
		where: { id },
	})

	if (school) return school
	return null
}

export default getSchool
