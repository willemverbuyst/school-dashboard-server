import { Score } from '@prisma/client'
import { prismaClient } from '../../prisma'
import { TestWithSubjectAndScores } from './models'

const groupBy = <T>(
  array: Array<T>,
  predicate: (v: T) => string
): { [key: string]: Array<T> } =>
  array.reduce((acc, value) => {
    ;(acc[predicate(value)] ||= []).push(value)
    return acc
  }, {} as { [key: string]: Array<T> })

const sumScores = (scores: Array<Score>): number =>
  scores.map(score => score.score).reduce((sum, score) => sum + score, 0)

const reduceScores = (obj: any): any => {
  return Object.values(obj).map((o: any) => {
    const numberOfTests = o.length
    return o.reduce((acc: any, value: any) => {
      acc.score = (acc.score || 0) + value.score
      return { ...acc, numberOfTests }
    })
  })
}

const formatTestsForTeacherAndStudent = (
  tests: Array<TestWithSubjectAndScores>
): Array<any> => {
  return tests.map((test: any) => ({
    subjectId: test.subject.id,
    subjectName: test.subject.name,
    score: sumScores(test.scores),
    studentId: test.student.id,
    userName: test.student.user.userName,
  }))
}

export const getTestForTeacherAndStudent = async (
  studentId: string,
  teacherId: string
): Promise<any | []> => {
  const tests = await prismaClient.test.findMany({
    where: {
      studentId,
      student: { teacherId },
    },
    include: {
      subject: true,
      scores: true,
      student: {
        select: { id: true, user: { select: { id: true, userName: true } } },
      },
    },
  })

  if (tests) {
    const formattedTests = formatTestsForTeacherAndStudent(tests)

    return reduceScores(
      groupBy(formattedTests, formattedTest => formattedTest.subjectId)
    )
  }

  return []
}
