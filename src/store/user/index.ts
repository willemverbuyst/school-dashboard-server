import { USER_LOCAL_STORAGE_KEY } from '../../constants/constants';
import { ApiUser } from '../../models/auth.models';

export const getStoredUser = (): ApiUser | null => {
  const storedUser = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const setStoredUser = (user: ApiUser): void => {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
};

export const removeUserFromLocalstorage = (): void => {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
};
