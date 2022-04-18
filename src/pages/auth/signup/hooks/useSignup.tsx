import axios, { AxiosResponse } from 'axios'
import { axiosInstance } from '../../../../axiosInstance'
import { Toast } from '../../../../components/toast'
import { ApiUser } from '../../../../models/api/user.api'
import { useUser } from '../../../auth/hooks/useUser'

export interface SignupInput {
	bio: string
	bsn: string
	email: string
	password: string
	role: string
	school: string
	teacher: string
	userName: string
}

export interface ApiError {
	message: string
}

export const useSignup = () => {
	const serverError = 'There was an error contacting the server!'
	const { updateUser } = useUser()
	const urlEndpoint = '/auth/signup'

	const authServerCall = async ({
		bio,
		bsn,
		email,
		password,
		role,
		school,
		teacher,
		userName,
	}: SignupInput): Promise<void> => {
		try {
			const { data, status }: AxiosResponse<ApiUser | ApiError> =
				await axiosInstance({
					url: urlEndpoint,
					method: 'POST',
					data: {
						bio,
						bsn,
						email,
						password,
						role,
						schoolId: school,
						teacherId: teacher,
						userName,
					},
					headers: { 'Content-Type': 'application/json' },
				})

			if (!status.toString().startsWith('2')) {
				const text =
					data && data.message ? data.message : 'Something went wrong'
				Toast({ text, status: 'warning' })
				return
			}

			if ('data' in data && 'token' in data && 'user' in data.data) {
				const text = data && data.message ? data.message : 'Welcome'
				Toast({ text, status: 'success' })
				updateUser(data)
			}
		} catch (errorResponse) {
			const text =
				axios.isAxiosError(errorResponse) &&
				errorResponse?.response?.data?.message
					? errorResponse?.response?.data?.message
					: serverError
			Toast({ text, status: 'error' })
		}
	}

	const signup = async (input: SignupInput): Promise<void> =>
		authServerCall(input)

	return { signup }
}
