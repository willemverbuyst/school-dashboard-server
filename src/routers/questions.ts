import { NextFunction, Router, Response } from 'express';
import { RequestWithBody } from '../interfaces/Requests';
import Answer from '../db/models/answer';
import Question from '../db/models/question';
import Test from '../db/models/test';
import { auth as studentAuthMiddleware } from '../auth/studentAuthMiddleware';
import { auth as teacherAuthMiddleware } from '../auth/teacherAuthMiddleware';

const router = Router();

// // TEACHER post a new question for a subject
// router.post(
//   '/',
//   teacherAuthMiddleware,
//   async (req: RequestWithBody, res: Response, next: NextFunction) => {
//     const {
//       subjectId,
//       question,
//       answer1,
//       answer2,
//       answer3,
//       answer4,
//     } = req.body;

//     console.log(subjectId, question, answer1, answer2, answer3, answer4);

//     if (
//       !subjectId ||
//       !question ||
//       !answer1 ||
//       !answer2 ||
//       !answer3 ||
//       !answer4
//     ) {
//       return res
//         .status(400)
//         .send({ message: 'Please provide question, 4 answers and subject' });
//     }
//     try {
//       const newQuestion = await Question.create({
//         text: question,
//         subjectId: Number(subjectId),
//       });
//       // Create correct answer
//       await Answer.create({
//         text: answer1,
//         correct: true,
//         questionId: newQuestion.id,
//       });
//       // Create 3 wrong answers
//       const newWrongsAnswers = [answer2, answer3, answer4].forEach((answer) =>
//         Answer.create({
//           text: answer,
//           correct: false,
//           questionId: newQuestion.id,
//         })
//       );

//       res.status(201).send({ message: 'You have added a new question.' });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// STUDENT get 3 random questions for a subject
router.get(
  '/3qtest/:id',
  studentAuthMiddleware,
  async (req: RequestWithBody, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const questions = await Question.findAll({
        where: { subjectId: id },
        include: { model: Answer, as: 'answers' },
      });
      if (!questions) {
        return res.status(404).send({
          message: 'No questions for that subject found',
        });
      } else {
        // https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array

        const shuffled = questions
          .map((question: any) => {
            return {
              answers: question.answers.sort(() => 0.5 - Math.random()),
              id: question.id,
              text: question.text,
              subjectId: question.subjectId,
            };
          })
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        res.send(shuffled);
      }
    } catch (error) {
      next(error);
    }
  }
);

// STUDENT post the results of his 3q test
router.post('/3qtest', studentAuthMiddleware, async (req, res, next) => {
  const { q1, q2, q3, a1, a2, a3, studentId, subjectId } = req.body;

  console.log('input', q1, q2, q3, a1, a2, a3, studentId, subjectId);

  try {
    await Test.create({
      question1: Number(q1),
      question2: Number(q2),
      question3: Number(q3),
      answer1: Number(a1),
      answer2: Number(a2),
      answer3: Number(a3),
      subjectId: Number(subjectId),
      studentId: Number(studentId),
    });

    const result = Number(a1) + Number(a2) + Number(a3);
    res.status(201).send({
      message: `You have finished your test with a score of ${result}/3`,
    });
  } catch (error) {
    next(error);
  }
});

export { router };
