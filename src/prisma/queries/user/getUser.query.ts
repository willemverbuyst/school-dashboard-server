import { User } from '@prisma/client'
import { prismaClient } from '../../../prisma'

export const getUser = async (email: string): Promise<User | null> =>
	await prismaClient.user.findUnique({
		where: { email },
	})

//     const { email, password } = data;
//     const user = await prisma.user.findUnique({
//         where: {
//             email
//         }
//     });
//     if (!user) {
//         throw createError.NotFound('User not registered')
//     }
//     const checkPassword = bcrypt.compareSync(password, user.password)
//     if (!checkPassword) throw createError.Unauthorized('Email address or password not valid')
//     delete user.password
//     const accessToken = await jwt.signAccessToken(user)
//     return { ...user, accessToken }
// }
// static async all() {
//     const allUsers = await prisma.user.findMany();
//     return allUsers;
// }
