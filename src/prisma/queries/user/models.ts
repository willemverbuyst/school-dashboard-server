import { User } from '@prisma/client'

interface Bio {
	bio: string
}

interface School {
	name: string
	location: string
}

interface Student {
	id: string
	school: School
	teacher: {
		id: string
		user: {
			userName: string
			email: string
		} | null
	} | null
}

interface Teacher {
	id: string
	school: School
	students: Array<{
		id: string
		user: {
			userName: string
			email: string
		} | null
	}> | null
}

type UserWithoutPassword = Omit<User, 'password'>

export interface UserPlus extends UserWithoutPassword {
	profile: Bio | null
	student: Student | null
	teacher: Teacher | null
}

export type UserPlusStudent = Omit<UserPlus, 'teacher'>

export type UserPlusTeacher = Omit<UserPlus, 'student'>
