import { useQuery } from 'react-query';
import { axiosInstance } from '../../../../axiosInstance';
import { School } from '../../../../models/schools.models';
import { queryKeys } from '../../../../react-query/constants';

export const getSchools = async () => {
  const { data } = await axiosInstance.get('/public/schools');
  return data;
};

export const useSchools = (): Array<School> => {
  const { data } = useQuery(queryKeys.SCHOOLS, getSchools);

  return data && data.data ? data.data : [];
};
