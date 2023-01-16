import { createUserStudent } from "./createUserStudent.query";
import { createUserTeacher } from "./createUserTeacher.query";
import { getUserByEmail } from "./getUserByEmail.query";
import { getUserById } from "./getUserById.query";
import { getUserPlus } from "./getUserPlus.query";

export const userQueries = {
  createUserStudent,
  createUserTeacher,
  getUserByEmail,
  getUserById,
  getUserPlus,
};
