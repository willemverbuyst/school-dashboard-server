import { prismaClient } from '../../server/src/prisma'
import { seedData } from '../../scripts/seedTables'
import { schools } from '../fixtures/school.fixtures'
import { subjects } from '../fixtures/subject.fixtures'
import { teachers } from '../fixtures/teacher.fixtures'
import { userStudents, userTeachers } from '../fixtures/user.fixtures'

seedData(prismaClient, {
	schools,
	subjects,
	teachers,
	userStudents,
	userTeachers,
})
