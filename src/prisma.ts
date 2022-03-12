import { PrismaClient } from '@prisma/client'
import { school_1, school_2 } from './prisma/dummyData'

const prisma = new PrismaClient()

const createSchools = async (): Promise<void> => {
	try {
		await prisma.school.createMany({
			data: [school_1, school_2],
			skipDuplicates: true,
		})

		console.log('*******************************************')
		console.log('Schools created')
	} catch (error) {
		console.log(String(error))
	}
}

const cleanUpTables = async () => {
	await prisma.school.deleteMany()
}

async function main() {
	await cleanUpTables()
	await createSchools()
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
