import { useQuery } from 'react-query';
import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';
import { Teacher } from './interfaces';

export const getTeachers = async () => {
  const { data } = await axiosInstance.get('/public/teachers');
  return data;
};

export const useTeachers = (): Array<Teacher> => {
  const { data } = useQuery(queryKeys.TEACHERS, getTeachers);

  return data && data.data ? data.data : [];
};
