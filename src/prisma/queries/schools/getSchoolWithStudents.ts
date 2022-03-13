import { prismaClient } from '../../../prisma'

export const getSchoolWithStudents = async (id: string) => {
	const schoolWithStudents = await prismaClient.school.findUnique({
		where: { id },
		include: { student: { select: { id: true } } },
	})

	return schoolWithStudents
}
