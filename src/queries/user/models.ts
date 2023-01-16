import { User } from "@prisma/client";

interface Bio {
  bio: string;
}

interface School {
  name: string;
  location: string;
}

interface Student {
  id: string;
  school: School;
  teacher: {
    id: string;
    user: {
      userName: string;
      email: string;
    } | null;
  } | null;
}

interface Teacher {
  id: string;
  school: School;
  students: Array<{
    id: string;
    user: {
      userName: string;
      email: string;
    } | null;
  }> | null;
}

export type UserWithoutPassword = Omit<User, "password">;

export interface UserPlus extends UserWithoutPassword {
  profile: Bio | null;
  student: Student | null;
  teacher: Teacher | null;
}

export interface UserWithIds extends UserWithoutPassword {
  student: { id: string } | null;
  teacher: { id: string } | null;
}

export interface InputCreateUserStudent {
  email: string;
  userName: string;
  passwordText: string;
  bsn: string;
  bio: string;
  schoolId: string;
  teacherId: string;
}

export interface InputCreateUserTeacher {
  email: string;
  userName: string;
  passwordText: string;
  bsn: string;
  bio: string;
  schoolId: string;
}
