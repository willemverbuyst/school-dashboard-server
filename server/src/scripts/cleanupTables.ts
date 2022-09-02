import { PrismaClient } from '@prisma/client'
import { logFinishRemoval, logInitRemoval, logRemoval } from '../log'

export const cleanUpTables = async (prisma: PrismaClient): Promise<void> => {
	logInitRemoval()
	await prisma.score.deleteMany()
	logRemoval('Score')
	await prisma.test.deleteMany()
	logRemoval('Test')
	await prisma.answer.deleteMany()
	logRemoval('Answer')
	await prisma.question.deleteMany()
	logRemoval('Question')
	await prisma.student.deleteMany()
	logRemoval('Student')
	await prisma.teacher.deleteMany()
	logRemoval('Teacher')
	await prisma.profile.deleteMany()
	logRemoval('Profile')
	await prisma.user.deleteMany()
	logRemoval('User')
	await prisma.subject.deleteMany()
	logRemoval('Subject')
	await prisma.school.deleteMany()
	logRemoval('School')
	logFinishRemoval()
}
