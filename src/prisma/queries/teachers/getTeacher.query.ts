import { prismaClient } from '../../../prisma'

export const getTeacher = async (id: string) => {
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

	return teacher
}
