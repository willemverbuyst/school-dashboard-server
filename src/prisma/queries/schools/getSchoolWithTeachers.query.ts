import { prismaClient } from '../../../prisma'

export const getSchoolWithTeachers = async (id: string) => {
	const schoolWithTeachers = await prismaClient.school.findUnique({
		where: { id },
		include: { teacher: { select: { id: true } } },
	})

	return schoolWithTeachers
}
