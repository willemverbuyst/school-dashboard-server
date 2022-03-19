import { Teacher } from '@prisma/client'

export interface TeacherWithSchool extends Teacher {
	school: { name: string; location: string }
}
