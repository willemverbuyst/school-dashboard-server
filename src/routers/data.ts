import { NextFunction, Router, Response } from 'express';
import Teacher from '../db/models/teacher';
import { RequestWithBody } from '../interfaces/Requests';
import Subject from '../db/models/subject';
import Test from '../db/models/test';
// const Subject = require('../models').subject;
// const Student = require('../models').student;
import { auth as studentAuthMiddleware } from '../auth/studentAuthMiddleware';
import { auth as teacherAuthMiddleware } from '../auth/teacherAuthMiddleware';
import { SubjectWithAnswers, ITest } from '../interfaces/Subject';

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
      const tests = await Test.findAll({
        attributes: ['answer1', 'answer2', 'answer3'],
        where: { studentId: Number(id) },
        include: [Test.associations.subject],
      });

      const t = tests.map((test: any) => {
        return {
          name: test.subject.name,
          score: test.answer1 + test.answer2 + test.answer3,
          subjectId: test.subject.id,
        };
      });
      // const subjectsWithAnswers = await Test.findAll
      //   {
      //     attributes: ['answer1', 'answer2', 'answer3'],
      //     where: { studentId: id },
      //     // // include: Subject,
      //     include: Test.associations.subject,
      //   }
      //   //   {
      //   //     model: Subject,
      //   //     // attributes: ['id', 'name'],
      //   //   },
      //   // ],
      // );

      // const results = subjectsWithAnswers.map((subject) => {
      //   return {
      //     subjectId: subject.id,
      //     name: subject.name,
      //     score: Math.round(
      //       (subject.tests
      //         .map(
      //           (test: { answer1: number; answer2: number; answer3: number }) =>
      //             test.answer1 + test.answer2 + test.answer3
      //         )
      //         .reduce((a: number, b: number) => a + b, 0) /
      //         (subject.tests.length * 3)) *
      //         100
      //     ),
      //     tests: subject.tests.length,
      //   };
      // });
      console.log(t.length);
      res.send(t);
    } catch (error) {
      return res.status(400).send({ message: 'Something went wrong, sorry' });
    }
  }
);

// TEACHER data per subject
// router.get('/subjects/:id', teacherAuthMiddleware, async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const students = await Student.findAll({
//       where: { teacherId: req.teacher.id },
//       attributes: ['id', 'name'],
//       include: [
//         {
//           model: Test,
//           where: { subjectId: id },
//           attributes: ['answer1', 'answer2', 'answer3'],
//         },
//       ],
//     });

//     const results = students.map((student) => {
//       return {
//         studentId: student.id,
//         name: student.name,
//         score: Math.round(
//           (student.tests
//             .map((test) => test.answer1 + test.answer2 + test.answer3)
//             .reduce((a, b) => a + b, 0) /
//             (student.tests.length * 3)) *
//             100
//         ),
//         tests: student.tests.length,
//       };
//     });
//     res.send(results);
//   } catch (error) {
//     return res.status(400).send({ message: 'Something went wrong, sorry' });
//   }
// });

// TEACHER data for main page
// router.get('/teacher/:id', teacherAuthMiddleware, async (req, res, next) => {
//   try {
//     // query to get all tests for scatter-chart
//     const students = await Student.findAll({
//       where: { teacherId: req.teacher.id },
//       attributes: ['id'],
//       include: [
//         {
//           model: Test,
//           attributes: [
//             'answer1',
//             'answer2',
//             'answer3',
//             'subjectId',
//             'createdAt',
//           ],
//         },
//       ],
//     });

//     const allTests = students
//       .map((student) =>
//         student.tests.map((test) => {
//           return {
//             subjectId: test.subjectId,
//             result: test.answer1 + test.answer2 + test.answer3,
//             at: test.createdAt,
//           };
//         })
//       )
//       .flat();

//     // query to get average per subject
//     const subjects = await Subject.findAll();

//     const scores = subjects
//       .map((subject) =>
//         allTests.filter((test) => test.subjectId === subject.id)
//       )
//       .map((subject) => {
//         return {
//           subjectId: subject.id,
//           length: subject.length,
//           result: Math.round(
//             (subject.map((sub) => sub.result).reduce((a, b) => a + b, 0) /
//               (subject.length * 3)) *
//               100
//           ),
//         };
//       });

//     res.send({ tests: allTests, scores });
//   } catch (error) {
//     return res.status(400).send({ message: 'Something went wrong, sorry' });
//   }
// });

export { router };
