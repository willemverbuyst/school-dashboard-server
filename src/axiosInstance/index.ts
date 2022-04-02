import axios, { AxiosRequestConfig } from 'axios'
import { apiUrl } from '../constants/constants'
import { ApiUser } from '../models/api/user.api'

export const getJWTHeader = (user: ApiUser): Record<string, string> => ({
	Authorization: `Bearer ${user.token}`,
})

const config: AxiosRequestConfig = { baseURL: apiUrl }

export const axiosInstance = axios.create(config)
