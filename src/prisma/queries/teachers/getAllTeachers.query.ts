import { Teacher } from '@prisma/client'
import { prismaClient } from '../../../prisma'

export const getAllTeachers = async (): Promise<Array<Teacher>> =>
	await prismaClient.teacher.findMany()
