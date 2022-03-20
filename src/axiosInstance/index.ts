import axios, { AxiosRequestConfig } from 'axios';
import { apiUrl } from '../constants/constants';
import { User } from '../models/User.models';

export const getJWTHeader = (user: User): Record<string, string> => ({
  Authorization: `Bearer ${user.token}`,
});

const config: AxiosRequestConfig = { baseURL: apiUrl };

export const axiosInstance = axios.create(config);
