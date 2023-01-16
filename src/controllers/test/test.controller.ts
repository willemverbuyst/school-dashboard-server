import { NextFunction, Response } from "express";
import { RequestWithBody } from "../../interfaces/Requests";
import { studentAuthMiddleware } from "../../middlewares/studentAuthMiddleware";
import { questionQueries, testQueries } from "../../queries";
import { controller, get, post, use } from "../decorators";

const { getQuestionsForTest } = questionQueries;
const { createTest } = testQueries;

@controller("/test")
export class TestController {
  @get("/subjects/:id")
  @use(studentAuthMiddleware)
  async getQuestionsForSubject(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(422).send({ message: "Must provide subject id" });
        return;
      }

      const questions = await getQuestionsForTest(id);

      if (!questions) {
        res.status(404).send({
          message: "No questions for that subject found",
        });
        return;
      }

      res.send({ results: questions.length, data: questions });
    } catch (error) {
      next(error);
    }
  }

  @post("/subjects/:id")
  @use(studentAuthMiddleware)
  async postQuestionForSubject(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      answer1,
      answer2,
      answer3,
      question1,
      question2,
      question3,
      studentId,
    } = req.body;
    const { id } = req.params;

    if (
      !answer1 ||
      !answer2 ||
      !answer3 ||
      !question1 ||
      !question2 ||
      !question3
    ) {
      res.status(422).send({ message: "Missing input" });
      return;
    }

    if (!studentId) {
      res.status(422).send({ message: "Student id missing" });
      return;
    }

    try {
      const result = await createTest(
        answer1,
        answer2,
        answer3,
        question1,
        question2,
        question3,
        studentId,
        id
      );

      res.status(201).send({
        message: `You have finished your test with a score of ${result}/3`,
      });
    } catch (error) {
      next(error);
    }
  }
}
