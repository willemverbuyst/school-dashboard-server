import { NextFunction, Response } from 'express';
import Answer from '../../db/models/answer';
import Question from '../../db/models/question';
import Test from '../../db/models/test';
import { RequestWithBody } from '../../interfaces/Requests';
import { studentAuthMiddleware } from '../../middlewares/studentAuthMiddleware';
import { bodyValidator, controller, get, post, use } from '../decorators';

@controller('')
class TeachersController {
  // STUDENT get 3 random questions for a subject
  @get('/questions/3qtest/:id')
  @use(studentAuthMiddleware)
  async getQuestionsForSubject(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    try {
      const questions = await Question.findAll({
        where: { subjectId: id },
        include: { model: Answer, as: 'answers' },
      });
      if (!questions) {
        res.status(404).send({
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

  // STUDENT post the results of his 3q test
  @post('/questions/3qtest')
  @bodyValidator('q1', 'q2', 'q3', 'a1', 'a2', 'a3', 'studentId', 'subjectId')
  @use(studentAuthMiddleware)
  async postQuestionForSubject(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { q1, q2, q3, a1, a2, a3, studentId, subjectId } = req.body;

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
  }
}
