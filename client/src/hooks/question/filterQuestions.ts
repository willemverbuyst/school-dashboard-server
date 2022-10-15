import { Question } from '../../models'

export const filterBySubject = (
  questions: Array<Question>,
  subjectId: string
): Question[] =>
  [...questions].filter(question => question.subjectId === subjectId)
