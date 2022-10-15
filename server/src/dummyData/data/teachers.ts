import { Teacher } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { getRandomValueInRange, numberOfSchools } from './config'
import { schools } from './schools'
import { userTeachers } from './users'

export const teachers: Array<Teacher> = userTeachers.map(teacher => ({
  id: uuidv4(),
  schoolId: schools[getRandomValueInRange(numberOfSchools)].id,
  userId: teacher.id,
}))
