import { Student } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import {
  getRandomValueInRange,
  numberOfSchools,
  numberOfTeachers,
} from './config'
import { schools } from './schools'
import { teachers } from './teachers'
import { userStudents } from './users'

export const students: Array<Student> = userStudents.map(student => ({
  id: uuidv4(),
  schoolId: schools[getRandomValueInRange(numberOfSchools)].id,
  userId: student.id,
  teacherId: teachers[getRandomValueInRange(numberOfTeachers)].id,
}))
