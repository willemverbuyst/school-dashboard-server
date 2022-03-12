import { PrismaClient } from '@prisma/client'
import { logFinishRemoval, logInitRemoval, logRemoval } from './log'

export const cleanUpTables = async (prisma: PrismaClient) => {
	logInitRemoval()
	await prisma.question.deleteMany()
	logRemoval('Question')
	await prisma.subject.deleteMany()
	logRemoval('Subjects')
	await prisma.user.deleteMany()
	logRemoval('User')
	await prisma.school.deleteMany()
	logRemoval('School')
	logFinishRemoval()
}
