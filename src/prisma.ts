import { PrismaClient } from '@prisma/client'
import { schools } from './prisma/dummyData/schools'

import { subjects } from './prisma/dummyData/subjects'
import { users } from './prisma/dummyData/users'

const prisma = new PrismaClient()

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

const cleanUpTables = async () => {
	await prisma.school.deleteMany()
	await prisma.subject.deleteMany()
	await prisma.user.deleteMany()
}

async function main() {
	await cleanUpTables()
	await createSchools()
	await createSubjects()
	await createUsers()
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
