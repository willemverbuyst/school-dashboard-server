import { Teacher } from '@prisma/client'
import { prismaClient } from '../../prisma'

export const getAllTeachers = async (): Promise<Array<Teacher>> => {
  const teachers = await prismaClient.teacher.findMany({
    include: {
      user: { select: { userName: true } },
    },
  })

  return teachers
}
