import { Teacher } from '@prisma/client'
import prismaClient from '../../../prisma'

const getAllTeachers = async (): Promise<Array<Teacher>> => {
	const teachers = await prismaClient.teacher.findMany()

	return teachers
}

export default getAllTeachers
