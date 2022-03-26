import { AxiosResponse } from 'axios';
import { axiosInstance } from '../../../axiosInstance';

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
        console.log('error');
        return;
      }

      if ('data' in data && 'token' in data && 'user' in data.data) {
        console.log('success!');
        console.log('data :>> ', data);
      }
    } catch (errorResponse) {
      console.log(errorResponse);
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
