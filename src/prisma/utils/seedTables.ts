import { PrismaClient } from '@prisma/client'
import {
	profiles,
	questions,
	schools,
	students,
	subjects,
	teachers,
	users,
} from '../dummyData'

import { logFinishSeed, logInitSeed, logSeed } from './log'

const createProfiles = async (prisma: PrismaClient): Promise<void> => {
	await prisma.profile.createMany({
		data: profiles,
		skipDuplicates: true,
	})
	logSeed('Profile')
}

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
	await createSubjects(prisma)
	await createUsers(prisma)
	await createProfiles(prisma)
	await createTeachers(prisma)
	await createStudents(prisma)
	await createQuestions(prisma)
	logFinishSeed()
}
