import { Score, Subject, Test } from '@prisma/client'

export interface TestWithSubjectAndScores extends Test {
  subject: Subject
  scores: Array<Score>
}

export interface TestForStudent {
  id: string
  createdAt: string
  subject: Subject
  score: number
}
