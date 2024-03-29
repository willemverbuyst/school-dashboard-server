import { Test } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { students } from "./students";
import { subjects } from "./subjects";

const getRandomHour = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

const createDate = (day: number): Date =>
  new Date(
    new Date(new Date().setHours(getRandomHour(9, 16))).setDate(0 - day)
  );

export const tests: Array<Test> = subjects.flatMap((subject) =>
  students.flatMap((student) =>
    Array(10)
      .fill(0)
      .map((_, i) => ({
        id: uuidv4(),
        createdAt: createDate(i),
        subjectId: subject.id,
        studentId: student.id,
      }))
  )
);
