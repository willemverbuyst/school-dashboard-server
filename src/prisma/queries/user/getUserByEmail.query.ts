import { User } from '@prisma/client'
import prismaClient from '../../../prisma'

const getUserByEmail = async (email: string): Promise<User | null> => {
	const user = await prismaClient.user.findUnique({
		where: { email },
	})

	if (user) {
		const { password, ...userWithoutPassword } = user

		return userWithoutPassword
	}
	return null
}

export default getUserByEmail
