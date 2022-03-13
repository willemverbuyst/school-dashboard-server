import { PrismaClient } from '@prisma/client'
import { getAllSchools, getSchool } from './prisma/queries/schools'
import { getAllSubjects, getSubject } from './prisma/queries/subjects'
import { cleanUpTables } from './prisma/utils/cleanupTables'
import { seedData } from './prisma/utils/seedTables'

export const prismaClient = new PrismaClient()

async function main() {
	// await cleanUpTables(prismaClient)
	// await seedData(prismaClient)
	getAllSchools()
	getAllSubjects()
	getSchool('e501ac78-a733-44f2-9b1c-df7e94d7a278')
	getSubject('957db6a1-47ed-4d9d-895c-ea7f017f74eb')
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prismaClient.$disconnect()
	})
