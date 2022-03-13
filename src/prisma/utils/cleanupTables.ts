import { PrismaClient } from '@prisma/client'
import { logFinishRemoval, logInitRemoval, logRemoval } from './log'

export const cleanUpTables = async (prisma: PrismaClient) => {
	logInitRemoval()
	await prisma.question.deleteMany()
	logRemoval('Question')
	await prisma.subject.deleteMany()
	logRemoval('Subject')
	await prisma.student.deleteMany()
	logRemoval('Student')
	await prisma.teacher.deleteMany()
	logRemoval('Teacher')
	await prisma.user.deleteMany()
	logRemoval('User')
	await prisma.school.deleteMany()
	logRemoval('School')
	logFinishRemoval()
}
