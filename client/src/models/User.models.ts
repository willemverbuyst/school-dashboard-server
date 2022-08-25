export interface User {
  token: string
  data: Data
  message: string
}

export interface Data {
  subjects: DataSubjects
  user: DataUser
}

export interface DataSubjects {
  results: number
  data: Subject[]
}

export interface Subject {
  id: string
  name: string
}

export interface DataUser {
  id: string
  email: string
  userName: string
  role: string
  profile: Profile
  student: Student
  teacher: null
}

export interface Profile {
  bio: string
}

export interface Student {
  id: string
  school: School
  teacher: Teacher
}

export interface School {
  name: string
  location: string
}

export interface Teacher {
  id: string
  user: TeacherUser
}

export interface TeacherUser {
  userName: string
  email: string
}
