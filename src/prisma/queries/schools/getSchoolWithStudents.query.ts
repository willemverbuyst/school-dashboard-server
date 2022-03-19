import { prismaClient } from '../../../prisma'
import { SchoolWithStudents } from './models'

export const getSchoolWithStudents = async (
	id: string
): Promise<SchoolWithStudents | null> => {
	const schoolWithStudents = await prismaClient.school.findUnique({
		where: { id },
		include: { students: { select: { id: true } } },
	})

	return schoolWithStudents
}
