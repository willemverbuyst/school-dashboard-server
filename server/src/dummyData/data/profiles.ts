import { faker } from '@faker-js/faker'
import { Profile } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { userStudents, userTeachers } from './users'

const users = [...userStudents, ...userTeachers]

export const profiles: Array<Profile> = users.map(user => ({
	id: uuidv4(),
	bio: faker.hacker.phrase(),
	userId: user.id,
}))
