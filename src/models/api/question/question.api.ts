export interface Answer {
  id: string
  text: string
  correct: boolean
  questionId: string
}

export interface Question {
  id: string
  text: string
  subjectId: string
  answers: Array<Answer>
}

export interface ApiQuestion {
  result: number
  data: Array<Question>
}
