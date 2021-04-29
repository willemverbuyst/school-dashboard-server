import { NextFunction, Router, Response } from 'express';
import { RequestWithBody } from '../interfaces/Requests';
import Student from '../db/models/student';
import Subject from '../db/models/subject';
import Test from '../db/models/test';
import { auth as studentAuthMiddleware } from '../auth/studentAuthMiddleware';
import { auth as teacherAuthMiddleware } from '../auth/teacherAuthMiddleware';

const router = Router();

// STUDENT info for main page
router.get(
  '/main',
  studentAuthMiddleware,
  async (req: RequestWithBody, res: Response, _next: NextFunction) => {
    const studentId = req.student.id;

    try {
      const tests = await Test.findAll({ where: { studentId } });
      const results = tests.map(
        ({ answer1, answer2, answer3, createdAt, subjectId }) => {
          return {
            result: answer1 + answer2 + answer3,
            at: createdAt,
            subject: subjectId,
          };
        }
      );
      res.send(results);
    } catch (error) {
      return res.status(400).send({ message: 'Something went wrong, sorry' });
    }
  }
);

// STUDENT info for one subject
router.get(
  '/:id',
  studentAuthMiddleware,
  async (req: RequestWithBody, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const studentId = req.student.id;

    try {
      const tests = await Test.findAll({ where: { studentId, subjectId: id } });
      const results = tests.map(({ answer1, answer2, answer3, createdAt }) => {
        return { result: answer1 + answer2 + answer3, at: createdAt };
      });
      res.send(results);
    } catch (error) {
      return res.status(400).send({ message: 'Something went wrong, sorry' });
    }
  }
);

// TEACHER data per student
router.get(
  '/students/:id',
  teacherAuthMiddleware,
  async (req: RequestWithBody, res: Response, _next: NextFunction) => {
    const { id } = req.params;

    try {
      const subjects = await Subject.findAll({
        attributes: ['id', 'name'],
        include: {
          model: Test,
          as: 'tests',
          where: { studentId: id },
          attributes: ['answer1', 'answer2', 'answer3'],
        },
      });

      const results = subjects.map((subject: any) => {
        return {
          subjectId: subject.id,
          name: subject.name,
          score: Math.round(
            (subject.tests
              .map(
                (test: { answer1: number; answer2: number; answer3: number }) =>
                  test.answer1 + test.answer2 + test.answer3
              )
              .reduce((a: number, b: number) => a + b, 0) /
              (subject.tests.length * 3)) *
              100
          ),
          tests: subject.tests.length,
        };
      });
      res.send(results);
    } catch (error) {
      return res.status(400).send({ message: 'Something went wrong, sorry' });
    }
  }
);

// TEACHER data per subject
router.get(
  '/subjects/:id',
  teacherAuthMiddleware,
  async (req: RequestWithBody, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const teacherId = req.teacher.id;

    try {
      const students = await Student.findAll({
        where: { teacherId },
        attributes: ['id', 'name'],
        include: [
          {
            model: Test,
            as: 'tests',
            where: { subjectId: id },
            attributes: ['answer1', 'answer2', 'answer3'],
          },
        ],
      });

      const results = students.map((student: any) => {
        return {
          studentId: student.id,
          name: student.name,
          score: Math.round(
            (student.tests
              .map(
                (test: { answer1: number; answer2: number; answer3: number }) =>
                  test.answer1 + test.answer2 + test.answer3
              )
              .reduce((a: number, b: number) => a + b, 0) /
              (student.tests.length * 3)) *
              100
          ),
          tests: student.tests.length,
        };
      });
      res.send(results);
    } catch (error) {
      return res.status(400).send({ message: 'Something went wrong, sorry' });
    }
  }
);

// TEACHER data for main page
router.get(
  '/teacher/:id',
  teacherAuthMiddleware,
  async (req: RequestWithBody, res: Response, _next: NextFunction) => {
    const teacherId = req.teacher.id;

    try {
      const tests = await Test.findAll({
        attributes: ['subjectId', 'answer1', 'answer2', 'answer3', 'createdAt'],
        include: [
          {
            model: Student,
            as: 'student',
            where: { teacherId },
            attributes: ['id', 'teacherId'],
          },
        ],
      });

      const allTests = tests.map((test: any) => {
        return {
          subjectId: test.subjectId,
          result: test.answer1 + test.answer2 + test.answer3,
          at: test.createdAt,
        };
      });

      // Query to get average per subject
      const subjects = await Subject.findAll();

      const scores = subjects
        .map((subject) =>
          allTests.filter((test) => test.subjectId === subject.id)
        )
        .map((subject: any) => {
          return {
            subjectId: subject.id,
            length: subject.length,
            result: Math.round(
              (subject
                .map((sub: any) => sub.result)
                .reduce((a: number, b: number) => a + b, 0) /
                (subject.length * 3)) *
                100
            ),
          };
        });

      res.send({ tests: allTests, scores });
    } catch (error) {
      return res.status(400).send({ message: 'Something went wrong, sorry' });
    }
  }
);

export { router };
