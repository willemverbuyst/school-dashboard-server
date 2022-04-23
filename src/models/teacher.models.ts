export interface Teacher {
  id: string
  schoolId: string
  user: { userName: string }
  userId: string
}

export interface ApiTeacher {
  result: number
  data: Array<Teacher>
}
