import prismaClient from '../../../prisma'
import { TeacherWithSchool } from './models'

export const getTeacher = async (
	id: string
): Promise<TeacherWithSchool | null> => {
	const teacher = await prismaClient.teacher.findUnique({
		where: { id },
		include: {
			school: {
				select: {
					name: true,
					location: true,
				},
			},
		},
	})

	if (teacher) return teacher
	return null
}
