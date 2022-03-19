import { Teacher } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { schools } from './schools'
import { userTeachers } from './users'

export const teachers: Array<Teacher> = userTeachers.map((teacher, i) => ({
	id: uuidv4(),
	schoolId: schools[i].id,
	userId: teacher.id,
}))
