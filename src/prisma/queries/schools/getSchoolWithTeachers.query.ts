import prismaClient from '../../../prisma'
import { SchoolWithTeachers } from './models'

const getSchoolWithTeachers = async (
	id: string
): Promise<SchoolWithTeachers | null> => {
	const schoolWithTeachers = await prismaClient.school.findUnique({
		where: { id },
		include: { teachers: { select: { id: true } } },
	})

	if (schoolWithTeachers) return schoolWithTeachers
	return null
}

export default getSchoolWithTeachers
