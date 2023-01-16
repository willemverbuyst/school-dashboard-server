import { prismaClient } from "../../prisma";

const getTestsWithSummedScores = (tests: any): any => {
  return tests.map((test: any) => ({
    ...test,
    scores: test.scores
      .map((score: any) => score.score)
      .reduce((sum: number, score: number) => sum + score, 0),
  }));
};

export const getAllTestsForTeacher = async (
  teacherId: string
): Promise<any> => {
  const tests = await prismaClient.test.findMany({
    where: {
      student: {
        teacherId,
      },
    },
    include: {
      scores: { select: { score: true } },
    },
  });

  if (tests) {
    const testsWithSummedScores = getTestsWithSummedScores(tests);
    return { testsWithSummedScores };
  }
  return null;
};
