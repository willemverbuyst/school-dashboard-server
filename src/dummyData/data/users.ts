import { faker } from "@faker-js/faker";
import { Role, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateBSN } from "bsn-js";
import { v4 as uuidv4 } from "uuid";
import { SALT_ROUNDS } from "../../config/constants";
import { numberOfTeachers, numbersOfStudents } from "./config";

export const userStudents: Array<User> = Array(numbersOfStudents)
  .fill(0)
  .map(() => ({
    id: uuidv4(),
    email: faker.internet.email(),
    userName: faker.internet.userName(),
    role: Role.STUDENT,
    password: bcrypt.hashSync("123", SALT_ROUNDS),
    bsn: generateBSN(),
  }));

export const userTeachers: Array<User> = Array(numberOfTeachers)
  .fill(0)
  .map(() => ({
    id: uuidv4(),
    email: faker.internet.email(),
    userName: faker.internet.userName(),
    role: Role.TEACHER,
    password: bcrypt.hashSync("123", SALT_ROUNDS),
    bsn: generateBSN(),
  }));
