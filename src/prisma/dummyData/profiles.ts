import { Profile } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { userStudents, userTeachers } from './users'

const bios = [
	'Read a book a day and keep the docker away',
	"Let's rock this place",
	'Run Forest Run',
	'Love sailing',
	'Who',
	'Not so small',
]

const users = [...userStudents, ...userTeachers]

export const profiles: Array<Profile> = bios.map((bio, i) => ({
	id: uuidv4(),
	bio: bio,
	userId: users[i].id,
}))
