import { useState } from 'react'
import { useQuery } from 'react-query'
import { axiosInstance, getJWTHeader } from '../../../axiosInstance'
import { ApiUser } from '../../../models/auth.models'
import { queryKeys } from '../../../react-query/constants'
import { useUser } from '../../auth/hooks/useUser'

const getSubjectWithResults = async (
	subjectId: string,
	user: ApiUser | null
) => {
	try {
		if (!user) return null
		const { data } = await axiosInstance.get(`/student/subjects/${subjectId}`, {
			headers: getJWTHeader(user),
		})

		return data.data
	} catch (error) {
		console.log(error)
	}
}

export const useSubject = () => {
	const { user } = useUser()
	const [subjectId, setSubjectId] = useState('')
	const fallback = []
	const { data: subject = fallback } = useQuery(
		[queryKeys.STUDENT_SUBJECT, subjectId],
		() => getSubjectWithResults(subjectId, user)
	)

	return { subject, subjectId, setSubjectId }
}
