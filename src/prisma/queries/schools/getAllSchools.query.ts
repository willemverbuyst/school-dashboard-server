import { School } from '@prisma/client'
import prismaClient from '../../../prisma'

const getAllSchools = async (): Promise<Array<School>> => {
	const schools = await prismaClient.school.findMany()

	return schools
}

export default getAllSchools
