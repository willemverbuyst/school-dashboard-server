import { PrismaClient } from '@prisma/client'
import { questions } from '../dummyData/questions'
import { schools } from '../dummyData/schools'
import { students } from '../dummyData/students'
import { subjects } from '../dummyData/subjects'
import { teachers } from '../dummyData/teachers'
import { users } from '../dummyData/users'
import { logFinishSeed, logInitSeed, logSeed } from './log'

const createQuestions = async (prisma: PrismaClient): Promise<void> => {
	await prisma.question.createMany({
		data: questions,
		skipDuplicates: true,
	})
	logSeed('Question')
}

const createSchools = async (prisma: PrismaClient): Promise<void> => {
	await prisma.school.createMany({
		data: schools,
		skipDuplicates: true,
	})
	logSeed('School')
}

const createSubjects = async (prisma: PrismaClient): Promise<void> => {
	await prisma.subject.createMany({
		data: subjects,
		skipDuplicates: true,
	})
	logSeed('Subject')
}

const createStudents = async (prisma: PrismaClient): Promise<void> => {
	await prisma.student.createMany({
		data: students,
		skipDuplicates: true,
	})
	logSeed('Student')
}

const createTeachers = async (prisma: PrismaClient): Promise<void> => {
	await prisma.teacher.createMany({
		data: teachers,
		skipDuplicates: true,
	})
	logSeed('Teacher')
}

const createUsers = async (prisma: PrismaClient): Promise<void> => {
	await prisma['user'].createMany({
		data: users,
		skipDuplicates: true,
	})
	logSeed('User')
}

export const seedData = async (prisma: PrismaClient) => {
	logInitSeed()
	await createSchools(prisma)
	await createUsers(prisma)
	await createSubjects(prisma)
	await createTeachers(prisma)
	await createStudents(prisma)
	await createQuestions(prisma)
	logFinishSeed()
}
