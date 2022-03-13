import { prismaClient } from '../../../prisma'

export const getAllTeachers = async () => {
	const teachers = await prismaClient.teacher.findMany()

	return teachers
}
