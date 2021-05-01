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

export interface Subject {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  text: string;
  subjectId: number;
  createdAt: Date;
  updatedAt: Date;
}
