import { PrismaClient } from '@prisma/client'
import { cleanUpTables } from './prisma/utils/cleanupTables'
import { seedData } from './prisma/utils/seedTables'

export const prismaClient = new PrismaClient()

async function main() {
	await cleanUpTables(prismaClient)
	await seedData(prismaClient)
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prismaClient.$disconnect()
	})
