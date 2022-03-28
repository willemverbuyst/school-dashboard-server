import { PrismaClient } from '@prisma/client'
import { cleanUpTables } from './cleanupTables'
import { seedData } from './seedTables'

export const prismaClient = new PrismaClient()

async function main(): Promise<void> {
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
