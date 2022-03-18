import { PrismaClient } from '@prisma/client'
import {
	answers,
	profiles,
	questions,
	schools,
	scores,
	students,
	subjects,
	teachers,
	tests,
	userStudents,
	userTeachers,
} from '../dummyData'

import { logFinishSeed, logInitSeed, logSeed } from './log'

const createAnswers = async (prisma: PrismaClient): Promise<void> => {
	await prisma.answer.createMany({
		data: answers,
		skipDuplicates: true,
	})
	logSeed('Answer')
}

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

const createScores = async (prisma: PrismaClient): Promise<void> => {
	await prisma.score.createMany({
		data: scores,
		skipDuplicates: true,
	})
	logSeed('School')
}

const createStudents = async (prisma: PrismaClient): Promise<void> => {
	await prisma.student.createMany({
		data: students,
		skipDuplicates: true,
	})
	logSeed('Student')
}

const createSubjects = async (prisma: PrismaClient): Promise<void> => {
	await prisma.subject.createMany({
		data: subjects,
		skipDuplicates: true,
	})
	logSeed('Subject')
}

const createTeachers = async (prisma: PrismaClient): Promise<void> => {
	await prisma.teacher.createMany({
		data: teachers,
		skipDuplicates: true,
	})
	logSeed('Teacher')
}

const createTests = async (prisma: PrismaClient): Promise<void> => {
	await prisma['test'].createMany({
		data: tests,
		skipDuplicates: true,
	})
	logSeed('Tests')
}

const createUserStudents = async (prisma: PrismaClient): Promise<void> => {
	await prisma['user'].createMany({
		data: userStudents,
		skipDuplicates: true,
	})
	logSeed('UserStudent')
}

const createUserTeachers = async (prisma: PrismaClient): Promise<void> => {
	await prisma['user'].createMany({
		data: userTeachers,
		skipDuplicates: true,
	})
	logSeed('UserTeacher')
}

export const seedData = async (prisma: PrismaClient) => {
	logInitSeed()
	await createSchools(prisma)
	await createSubjects(prisma)
	await createUserTeachers(prisma)
	await createUserStudents(prisma)
	await createProfiles(prisma)
	await createTeachers(prisma)
	await createStudents(prisma)
	await createQuestions(prisma)
	await createAnswers(prisma)
	await createTests(prisma)
	await createScores(prisma)
	logFinishSeed()
}
