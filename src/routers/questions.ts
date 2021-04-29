import { NextFunction, Router, Response } from 'express';
import { RequestWithBody } from '../interfaces/Requests';
import Answer from '../db/models/answer';
import Question from '../db/models/question';
import Student from '../db/models/student';
import Subject from '../db/models/subject';
import Test from '../db/models/test';
import { auth as studentAuthMiddleware } from '../auth/studentAuthMiddleware';
import { auth as teacherAuthMiddleware } from '../auth/teacherAuthMiddleware';

const router = Router();

// TEACHER get all the questions for one subject
router.get(
  '/:id',
  teacherAuthMiddleware,
  async (req: RequestWithBody, res: Response, next: NextFunction) => {
    const { id: subjectId } = req.params;
    try {
      const questions = await Question.findAll({
        where: { subjectId },
        attributes: ['id', 'subjectId', 'text'],
        include: {
          model: Answer,
          as: 'answers',
          attributes: ['id', 'questionId', 'text'],
        },
      });
      if (!questions) {
        return res.status(404).send({
          message: 'No questions for that subject found',
        });
      } else {
        res.send(questions);
      }
    } catch (error) {
      next(error);
    }
  }
);

// TEACHER post a new question for a subject
router.post(
  '/',
  teacherAuthMiddleware,
  async (req: RequestWithBody, res: Response, next: NextFunction) => {
    const {
      subjectId,
      question,
      answer1,
      answer2,
      answer3,
      answer4,
    } = req.body;

    console.log(subjectId, question, answer1, answer2, answer3, answer4);

    if (
      !subjectId ||
      !question ||
      !answer1 ||
      !answer2 ||
      !answer3 ||
      !answer4
    ) {
      return res
        .status(400)
        .send({ message: 'Please provide question, 4 answers and subject' });
    }
    try {
      const newQuestion = await Question.create({
        text: question,
        subjectId: Number(subjectId),
      });
      // Create correct answer
      await Answer.create({
        text: answer1,
        correct: true,
        questionId: newQuestion.id,
      });
      // Create 3 wrong answers
      const newWrongsAnswers = [answer2, answer3, answer4].forEach((answer) =>
        Answer.create({
          text: answer,
          correct: false,
          questionId: newQuestion.id,
        })
      );

      res.status(201).send({ message: 'You have added a new question.' });
    } catch (error) {
      next(error);
    }
  }
);

// STUDENT get 3 random questions for a subject
// router.get('/3qtest/:id', studentAuthMiddleware, async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const questions = await Question.findAll({
//       where: { subjectId: id },
//       include: [{ model: Answer }],
//     });
//     if (!questions) {
//       return res.status(404).send({
//         message: 'No questions for that subject found',
//       });
//     } else {
//       // https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array

//       const shuffled = questions
//         .map((question) => {
//           return {
//             answers: question.answers.sort(() => 0.5 - Math.random()),
//             id: question.id,
//             text: question.text,
//             subjectId: question.subjectId,
//           };
//         })
//         .sort(() => 0.5 - Math.random())
//         .slice(0, 3);
//       res.send(shuffled);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// STUDENT post the results of his 3q test
// router.post('/3qtest', studentAuthMiddleware, async (req, res, next) => {
//   const { studentId, subjectId, q1, q2, q3, a1, a2, a3 } = req.body;

//   try {
//     const newTest = await Test.create({
//       question1: q1,
//       question2: q2,
//       question3: q3,
//       answer1: a1,
//       answer2: a2,
//       answer3: a3,
//       subjectId,
//       studentId,
//     });

//     const result = a1 * 1 + a2 * 1 + a3 * 1;
//     res.status(201).send({
//       message: `You have finished your test with a score of ${result}/3`,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

export { router };
