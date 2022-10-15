import { Student } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { schools } from './schools'
import { teachers } from './teachers'
import { userStudents } from './users'

export const students: Array<Student> = userStudents.map((student, i) => ({
  id: uuidv4(),
  schoolId: schools[i % 2].id,
  userId: student.id,
  teacherId: teachers[i % 2].id,
}))
