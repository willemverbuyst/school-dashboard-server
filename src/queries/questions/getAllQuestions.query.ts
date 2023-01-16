import { prismaClient } from "../../prisma";
import { QuestionWithAnswers } from "./models";

export const getAllQuestions =
  async (): Promise<Array<QuestionWithAnswers> | null> => {
    const questionsForSubject = await prismaClient.question.findMany({
      include: { answers: true },
    });

    if (questionsForSubject.length > 0) return questionsForSubject;
    return null;
  };
