import axios, { AxiosResponse } from 'axios';
import { axiosInstance } from '../../../axiosInstance';
import { Toast } from '../../../components/toast';

export interface ApiUser {
  token: string;
  data: any;
  message: string;
}

export interface ApiError {
  message: string;
}

export type AuthResponse = ApiUser | ApiError;

export const useAuth = () => {
  const serverError = 'There was an error contacting the server!';
  const authServerCall = async (
    urlEndpoint: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const { data, status }: AxiosResponse<AuthResponse> = await axiosInstance(
        {
          url: urlEndpoint,
          method: 'POST',
          data: { email, password },
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!status.toString().startsWith('2')) {
        const text = 'message' in data ? data.message : 'Unauthorized';
        Toast({ text, status: 'warning' });
        return;
      }

      if ('data' in data && 'token' in data && 'user' in data.data) {
        Toast({ text: data.message, status: 'success' });
        // update user data
      }
    } catch (errorResponse) {
      const text =
        axios.isAxiosError(errorResponse) &&
        errorResponse?.response?.data?.message
          ? errorResponse?.response?.data?.message
          : serverError;
      Toast({ text, status: 'error' });
    }
  };

  // todo add extra input
  const signup = async (email: string, password: string): Promise<void> =>
    authServerCall('/auth/signup', email, password);

  const login = async (email: string, password: string): Promise<void> =>
    authServerCall('/auth/login', email, password);

  const logout = (): void => console.log('logged out');

  return {
    login,
    logout,
    signup,
  };
};
