import { Question } from '../../models/api/question/question.api'

export const filterBySubject = (
  questions: Array<Question>,
  subjectId: string
) => [...questions].filter((question) => question.subjectId === subjectId)
