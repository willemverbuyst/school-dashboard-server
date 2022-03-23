import { Teacher } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import schools from './schools'
import { userTeachers } from './users'

const teachers: Array<Teacher> = userTeachers.map((teacher, i) => ({
	id: uuidv4(),
	schoolId: schools[i % 2].id,
	userId: teacher.id,
}))

export default teachers
