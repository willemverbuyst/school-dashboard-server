import { PrismaClient } from '@prisma/client'
import { getAllSchools } from './prisma/queries/schools'
import { getAllSubjects, getOneSubject } from './prisma/queries/subjects'
import { cleanUpTables } from './prisma/utils/cleanupTables'
import { seedData } from './prisma/utils/seedTables'

export const prismaClient = new PrismaClient()

async function main() {
	// await cleanUpTables(prismaClient)
	// await seedData(prismaClient)
	getAllSchools()
	getAllSubjects()
	getOneSubject('e501ac78-a733-44f2-9b1c-df7e94d7a278')
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prismaClient.$disconnect()
	})
