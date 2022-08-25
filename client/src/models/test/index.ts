export interface ApiNewTest {
  message: string
}

export interface NewTest {
  answer1: string
  answer2: string
  answer3: string
  question1: string
  question2: string
  question3: string
  studentId: string
  subjectId: string
}

export interface TestInput {
  test: { [key: string]: string }
  studentId: string
  subjectId: string
}
