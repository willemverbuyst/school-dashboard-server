export interface User {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student extends User {
  teacherId: number;
}
