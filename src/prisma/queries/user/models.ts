import { User } from '@prisma/client'

export interface UserWithProfile extends User {
	profile: { bio: string } | null
}
