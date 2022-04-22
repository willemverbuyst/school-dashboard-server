import { useState } from 'react'
import { useQuery } from 'react-query'
import { axiosInstance, getJWTHeader } from '../../axiosInstance'
import { ApiUser } from '../../models/api/user.api'
import { queryKeys } from '../../react-query/constants'
import { useUser } from '../auth/useUser'

const getTestResultForSubject = async (
	subjectId: string,
	user: ApiUser | null
) => {
	try {
		if (!user) return null

		const teacherId = user.data.user.teacher?.id

		if (!teacherId) return null

		const { data } = await axiosInstance.get(
			`/teachers/${teacherId}/subjects/${subjectId}`,
			{
				headers: getJWTHeader(user),
			}
		)

		return data.data
	} catch (error) {
		console.log(error)
	}
}

export const useTestResultForSubject = () => {
	const { user } = useUser()
	const [subjectId, setSubjectId] = useState('')
	const fallback = []
	const { data: testResultsForSubject = fallback } = useQuery(
		[queryKeys.TEACHER_SUBJECT, subjectId],
		() => getTestResultForSubject(subjectId, user)
	)

	return { testResultsForSubject, subjectId, setSubjectId }
}
