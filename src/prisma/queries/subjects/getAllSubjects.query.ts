import { Subject } from '@prisma/client'
import prismaClient from '../../../prisma'

const getAllSubjects = async (): Promise<Array<Subject>> => {
	const subjects = await prismaClient.subject.findMany()

	return subjects
}

export default getAllSubjects
