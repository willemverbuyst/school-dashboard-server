import { useQuery } from 'react-query'
import { axiosInstance } from '../../../../axiosInstance'
import { ApiSchool, School } from '../../../../models/schools.models'
import { queryKeys } from '../../../../react-query/constants'

export const getSchools = async (): Promise<ApiSchool> => {
	const { data } = await axiosInstance.get('/schools')
	return data
}

export const useSchools = (): Array<School> => {
	const { data } = useQuery(queryKeys.SCHOOLS, getSchools)

	return data && data.data ? data.data : []
}
