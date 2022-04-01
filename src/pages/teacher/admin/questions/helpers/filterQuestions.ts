interface Question {
  id: string;
  text: string;
  subjectId: string;
  answers: any;
}

export const filterBySubject = (
  questions: Array<Question>,
  subjectId: string
) => [...questions].filter((question) => question.subjectId === subjectId);
