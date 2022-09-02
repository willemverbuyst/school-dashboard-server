import {
	Answer,
	PrismaClient,
	Profile,
	Question,
	School,
	Score,
	Student,
	Subject,
	Teacher,
	Test,
	User,
} from '@prisma/client'

import { logFinishSeed, logInitSeed, logSeed } from '../log'

const createAnswers = async (
	prisma: PrismaClient,
	answers: Array<Answer>
): Promise<void> => {
	await prisma.answer.createMany({
		data: answers,
		skipDuplicates: true,
	})
	logSeed('Answer')
}

const createProfiles = async (
	prisma: PrismaClient,
	profiles: Array<Profile>
): Promise<void> => {
	await prisma.profile.createMany({
		data: profiles,
		skipDuplicates: true,
	})
	logSeed('Profile')
}

const createQuestions = async (
	prisma: PrismaClient,
	questions: Array<Question>
): Promise<void> => {
	await prisma.question.createMany({
		data: questions,
		skipDuplicates: true,
	})
	logSeed('Question')
}

const createSchools = async (
	prisma: PrismaClient,
	schools: Array<School>
): Promise<void> => {
	await prisma.school.createMany({
		data: schools,
		skipDuplicates: true,
	})
	logSeed('School')
}

const createScores = async (
	prisma: PrismaClient,
	scores: Array<Score>
): Promise<void> => {
	await prisma.score.createMany({
		data: scores,
		skipDuplicates: true,
	})
	logSeed('School')
}

const createStudents = async (
	prisma: PrismaClient,
	students: Array<Student>
): Promise<void> => {
	await prisma.student.createMany({
		data: students,
		skipDuplicates: true,
	})
	logSeed('Student')
}

const createSubjects = async (
	prisma: PrismaClient,
	subjects: Array<Subject>
): Promise<void> => {
	await prisma.subject.createMany({
		data: subjects,
		skipDuplicates: true,
	})
	logSeed('Subject')
}

const createTeachers = async (
	prisma: PrismaClient,
	teachers: Array<Teacher>
): Promise<void> => {
	await prisma.teacher.createMany({
		data: teachers,
		skipDuplicates: true,
	})
	logSeed('Teacher')
}

const createTests = async (
	prisma: PrismaClient,
	tests: Array<Test>
): Promise<void> => {
	await prisma.test.createMany({
		data: tests,
		skipDuplicates: true,
	})
	logSeed('Tests')
}

const createUserStudents = async (
	prisma: PrismaClient,
	userStudents: Array<User>
): Promise<void> => {
	await prisma.user.createMany({
		data: userStudents,
		skipDuplicates: true,
	})
	logSeed('UserStudent')
}

const createUserTeachers = async (
	prisma: PrismaClient,
	userTeachers: Array<User>
): Promise<void> => {
	await prisma.user.createMany({
		data: userTeachers,
		skipDuplicates: true,
	})
	logSeed('UserTeacher')
}

interface SeedData {
	answers?: Array<Answer>
	profiles?: Array<Profile>
	questions?: Array<Question>
	scores?: Array<Score>
	schools?: Array<School>
	students?: Array<Student>
	subjects?: Array<Subject>
	teachers?: Array<Teacher>
	tests?: Array<Test>
	userStudents?: Array<User>
	userTeachers?: Array<User>
}

export const seedData = async (
	prisma: PrismaClient,
	{
		answers,
		profiles,
		questions,
		scores,
		schools,
		students,
		subjects,
		teachers,
		tests,
		userStudents,
		userTeachers,
	}: SeedData
): Promise<void> => {
	logInitSeed()
	if (schools) await createSchools(prisma, schools)
	if (subjects) await createSubjects(prisma, subjects)
	if (userStudents) await createUserTeachers(prisma, userStudents)
	if (userTeachers) await createUserStudents(prisma, userTeachers)
	if (profiles) await createProfiles(prisma, profiles)
	if (teachers) await createTeachers(prisma, teachers)
	if (students) await createStudents(prisma, students)
	if (questions) await createQuestions(prisma, questions)
	if (answers) await createAnswers(prisma, answers)
	if (tests) await createTests(prisma, tests)
	if (scores) await createScores(prisma, scores)
	logFinishSeed()
}
