import { School } from '@prisma/client'

export interface SchoolWithStudents extends School {
  students: Array<{ id: string }>
}

export interface SchoolWithTeachers extends School {
  teachers: Array<{ id: string }>
}
