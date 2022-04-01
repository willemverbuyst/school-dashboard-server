import { Question } from '../../../../../models/question.models';

export const filterBySubject = (
  questions: Array<Question>,
  subjectId: string
) => [...questions].filter((question) => question.subjectId === subjectId);
