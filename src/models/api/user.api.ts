export interface Subject {
	id: string
	name: string
}

export interface Subjects {
	results: number
	data: Subject[]
}

export interface Profile {
	bio: string
}

export interface School {
	name: string
	location: string
}

export interface TeacherForStudent {
	id: string
	user: {
		userName: string
		email: string
	}
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

export interface Student {
	id: string
	school: School
	teacher: TeacherForStudent
}

export interface User {
	id: string
	email: string
	userName: string
	role: string
	profile: Profile
	student?: Student
	teacher?: Teacher
}

export interface Subject {
	id: string
	name: string
}

export interface TestWithScores {
	id: string
	createdAt: Date
	subject: Subject
	score: number
}

export interface Overview {
	results: number
	data: TestWithScores[] | any
}

export interface Data {
	subjects: Subjects
	user: User
	overview: Overview
}

export interface ApiUser {
	token: string
	data: Data
	message: string
}
