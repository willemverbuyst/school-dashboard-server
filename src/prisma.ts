import { PrismaClient } from '@prisma/client'
import { questions } from './prisma/dummyData/questions'
import { schools } from './prisma/dummyData/schools'
import { subjects } from './prisma/dummyData/subjects'
import { users } from './prisma/dummyData/users'
import { cleanUpTables } from './prisma/utils/cleanupTables'

const prisma = new PrismaClient()

const createQuestions = async (): Promise<void> => {
	try {
		await prisma.question.createMany({
			data: questions,
			skipDuplicates: true,
		})

		console.log('*******************************************')
		console.log('Added to the DB: Questions')
	} catch (error) {
		console.log(String(error))
	}
}

const createSchools = async (): Promise<void> => {
	try {
		await prisma.school.createMany({
			data: schools,
			skipDuplicates: true,
		})

		console.log('*******************************************')
		console.log('Added to the DB: Schools')
	} catch (error) {
		console.log(String(error))
	}
}

const createSubjects = async (): Promise<void> => {
	try {
		await prisma.subject.createMany({
			data: subjects,
			skipDuplicates: true,
		})

		console.log('*******************************************')
		console.log('Added to the DB: Subjects')
	} catch (error) {
		console.log(String(error))
	}
}

const createUsers = async (): Promise<void> => {
	try {
		await prisma.user.createMany({
			data: users,
			skipDuplicates: true,
		})

		console.log('*******************************************')
		console.log('Added to the DB: Users')
	} catch (error) {
		console.log(String(error))
	}
}

async function main() {
	await cleanUpTables(prisma)
	await createSchools()
	await createUsers()
	await createSubjects()
	await createQuestions()
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
