import prismaClient from '../../../prisma'
import { UserWithoutPassword } from './models'

const getUserByEmail = async (
	email: string
): Promise<UserWithoutPassword | null> => {
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
