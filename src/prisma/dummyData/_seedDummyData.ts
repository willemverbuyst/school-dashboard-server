import { answers } from './answers'
import { profiles } from './profiles'
import { questions } from './questions'
import { schools } from './schools'
import { scores } from './scores'
import { subjects } from './subjects'
import { students } from './students'
import { teachers } from './teachers'
import { tests } from './tests'
import { userStudents, userTeachers } from './users'
import { seedData } from '../scripts/seedTables'
import { prismaClient } from '../../prisma'

seedData(prismaClient, {
	answers,
	profiles,
	questions,
	schools,
	scores,
	students,
	subjects,
	teachers,
	tests,
	userStudents,
	userTeachers,
})
