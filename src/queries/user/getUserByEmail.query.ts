import { User } from "@prisma/client";
import { prismaClient } from "../../prisma";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prismaClient.user.findUnique({
    where: { email },
  });

  return user;
};
