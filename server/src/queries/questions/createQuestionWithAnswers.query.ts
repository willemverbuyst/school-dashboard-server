import { Question } from '@prisma/client'
import { prismaClient } from '../../prisma'
import { NewQuestionWithAnswers } from './models'

export const createQuestionWithAnswers = async ({
  question,
  answer1text,
  answer2text,
  answer3text,
  answer4text,
  answer1bool,
  answer2bool,
  answer3bool,
  answer4bool,
  subjectId,
}: NewQuestionWithAnswers): Promise<Question | null> => {
  const newQuestion = await prismaClient.question.create({
    data: {
      text: question,
      subjectId,
      answers: {
        createMany: {
          data: [
            { text: answer1text, correct: answer1bool },
            { text: answer2text, correct: answer2bool },
            { text: answer3text, correct: answer3bool },
            { text: answer4text, correct: answer4bool },
          ],
        },
      },
    },
  })

  if (newQuestion) return newQuestion
  return null
}
