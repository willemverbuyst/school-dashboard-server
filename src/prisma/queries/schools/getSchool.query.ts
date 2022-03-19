import { School } from '@prisma/client'
import { prismaClient } from '../../../prisma'

export const getSchool = async (id: string): Promise<School | null> =>
	await prismaClient.school.findUnique({
		where: { id },
	})
