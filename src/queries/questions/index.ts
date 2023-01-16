import { createQuestionWithAnswers } from './createQuestionWithAnswers.query'
import { getAllQuestions } from './getAllQuestions.query'
import { getQuestionsForSubject } from './getQuestionsForSubject.query'
import { getQuestionsForTest } from './getQuestionsForTest.query'

export const questionQueries = {
  createQuestionWithAnswers,
  getAllQuestions,
  getQuestionsForSubject,
  getQuestionsForTest,
}
