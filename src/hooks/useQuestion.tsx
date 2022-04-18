import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { axiosInstance, getJWTHeader } from '../axiosInstance'
import { ApiUser } from '../models/api/user.api'
import { queryKeys } from '../react-query/constants'
import { useUser } from '../hooks/useUser'
import { filterBySubject } from './helpers/filterQuestions'

const getQuestions = async (user: ApiUser | null) => {
	try {
		if (!user) return null
		console.log('user :>> ', user)
		const { data } = await axiosInstance.get('/questions/', {
			headers: getJWTHeader(user),
		})

		// check property
		return data.data
	} catch (error) {
		console.log(error)
	}
}

export const useQuestions = () => {
	const [filter, setFilter] = useState<string>('all')

	const selectFn = useCallback(
		questions => filterBySubject(questions, filter),
		[filter]
	)

	const { user } = useUser()
	const fallback = []
	const { data: questions = fallback } = useQuery(
		queryKeys.QUESTIONS,
		() => getQuestions(user),
		{
			select: filter === 'all' ? undefined : selectFn,
		}
	)

	return { questions, filter, setFilter }
}
