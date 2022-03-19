import { Role, User } from '@prisma/client'

export type UserWithoutPassword = Omit<User, 'password'>

export interface UserWithProfile extends UserWithoutPassword {
	profile: { bio: string } | null
}
