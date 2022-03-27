export interface User {
  id: string;
  email: string;
  userName: string;
  password: string;
  role: string;
}

interface BioInUser {
  bio: string;
}

interface SchoolInUser {
  name: string;
  location: string;
}

interface StudentInUser {
  id: string;
  school: SchoolInUser;
  teacher: {
    id: string;
    user: {
      userName: string;
      email: string;
    } | null;
  } | null;
}

interface TeacherInUser {
  id: string;
  school: SchoolInUser;
  students: Array<{
    id: string;
    user: {
      userName: string;
      email: string;
    } | null;
  }> | null;
}

export type UserWithoutPassword = Omit<User, 'password'>;

export interface UserPlus extends UserWithoutPassword {
  profile: BioInUser | null;
  student: StudentInUser | null;
  teacher: TeacherInUser | null;
}

export interface ApiUser {
  token: string;
  data: { user: UserPlus; subjects: any };
  message: string;
}
