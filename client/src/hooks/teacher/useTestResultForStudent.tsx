import { useState } from 'react'
import { useQuery } from 'react-query'
import { axiosInstance, getJWTHeader } from '../../axiosInstance'
import { ApiUser } from '../../models/api/user.api'
import { TestResult } from '../../pages/teacher/testResultsForSubject/BarChartTestsSubject'
import { queryKeys } from '../../react-query/constants'
import { useUser } from '../auth/useUser'

const getTestResultForStudent = async (
  studentId: string | null,
  user: ApiUser | null
): Promise<Array<TestResult> | null> => {
  try {
    if (!user || !studentId) return null

    const teacherId = user.data.user.teacher?.id

    if (!teacherId) return null

    const { data } = await axiosInstance.get(
      `/teachers/${teacherId}/students/${studentId}`,
      {
        headers: getJWTHeader(user),
      }
    )

    return data.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const useTestResultForStudent = () => {
  const { user } = useUser()
  const [studentId, setStudentId] = useState('')
  const fallback = []
  const { data = fallback } = useQuery(
    [queryKeys.TEACHER_STUDENT, studentId],
    () => getTestResultForStudent(studentId, user)
  )

  return { data, studentId, setStudentId }
}
