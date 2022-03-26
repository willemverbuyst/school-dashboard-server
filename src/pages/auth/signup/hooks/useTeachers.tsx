import { useQuery } from 'react-query';
import { axiosInstance } from '../../../../axiosInstance';
import { Teacher } from '../../../../models/teacher.models';
import { queryKeys } from '../../../../react-query/constants';

export const getTeachers = async () => {
  const { data } = await axiosInstance.get('/public/teachers');
  return data;
};

export const useTeachers = (): Array<Teacher> => {
  const { data } = useQuery(queryKeys.TEACHERS, getTeachers);

  return data && data.data ? data.data : [];
};
