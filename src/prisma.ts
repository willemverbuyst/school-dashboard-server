import { PrismaClient } from '@prisma/client'
import { cleanUpTables } from './prisma/utils/cleanupTables'
import { seedData } from './prisma/utils/seedTables'

const prisma = new PrismaClient()

async function main() {
	await cleanUpTables(prisma)
	await seedData(prisma)
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
