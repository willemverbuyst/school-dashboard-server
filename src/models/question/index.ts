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

export interface NewQuestion {
  id: string
  question: string
  answer1text: string
  answer2text: string
  answer3text: string
  answer4text: string
  answer1bool: boolean
  answer2bool: boolean
  answer3bool: boolean
  answer4bool: boolean
}

export interface QuestionInput {
  subject: string
  question: string
  correctAnswer: string
  wrongAnswer1: string
  wrongAnswer2: string
  wrongAnswer3: string
}
