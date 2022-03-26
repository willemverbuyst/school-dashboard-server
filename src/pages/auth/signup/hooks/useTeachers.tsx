import { useQuery } from 'react-query';
import { axiosInstance } from '../../../../axiosInstance';
import { ApiTeacher, Teacher } from '../../../../models/teacher.models';
import { queryKeys } from '../../../../react-query/constants';

export const getTeachers = async (): Promise<ApiTeacher> => {
  const { data } = await axiosInstance.get('/public/teachers');
  return data;
};

export const useTeachers = (): Array<Teacher> => {
  const { data } = useQuery(queryKeys.TEACHERS, getTeachers);

  return data && data.data ? data.data : [];
};
