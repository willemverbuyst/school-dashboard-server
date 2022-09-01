import { answers } from '../data/answers'
import { profiles } from '../data/profiles'
import { questions } from '../data/questions'
import { schools } from '../data/schools'
import { scores } from '../data/scores'
import { subjects } from '../data/subjects'
import { students } from '../data/students'
import { teachers } from '../data/teachers'
import { tests } from '../data/tests'
import { userStudents, userTeachers } from '../data/users'
import { seedData } from '../../../../scripts/seedTables'
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
