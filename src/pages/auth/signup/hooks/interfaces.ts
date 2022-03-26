export interface School {
  id: string;
  name: string;
  location: string;
}

export interface Teacher {
  id: string;
  schoolId: string;
  user: { userName: string };
  userId: string;
}
