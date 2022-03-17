import { PrismaClient } from '@prisma/client'
import { getQuestionsForSubject } from './prisma/queries/questions'
import {
	getAllSchools,
	getSchool,
	getSchoolWithStudents,
	getSchoolWithTeachers,
} from './prisma/queries/schools'
import { getAllSubjects, getSubject } from './prisma/queries/subjects'
import { getUser, getUserWithProfile } from './prisma/queries/user'

import { cleanUpTables } from './prisma/utils/cleanupTables'
import { seedData } from './prisma/utils/seedTables'

export const prismaClient = new PrismaClient()

async function main() {
	await cleanUpTables(prismaClient)
	// 	await seedData(prismaClient)
	// 	console.log(await getAllSchools())
	// 	console.log(await getAllSubjects())
	// 	console.log(await getSchool('29f7727a-11fe-4196-9657-83ded2bd754d'))
	// 	console.log(
	// 		await getSchoolWithStudents('29f7727a-11fe-4196-9657-83ded2bd754d')
	// 	)
	// 	console.log(
	// 		await getSchoolWithTeachers('29f7727a-11fe-4196-9657-83ded2bd754d')
	// 	)
	// 	console.log(await getSubject('2748201d-51d2-469b-ab27-fb19005e4bc9'))
	// 	console.log(await getUser('43a74fe7-af76-46c0-9f37-1b74a55b11ab'))
	// 	console.log(await getUserWithProfile('43a74fe7-af76-46c0-9f37-1b74a55b11ab'))
	// 	console.log(
	// 		await getQuestionsForSubject('2748201d-51d2-469b-ab27-fb19005e4bc9')
	// 	)
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prismaClient.$disconnect()
	})
