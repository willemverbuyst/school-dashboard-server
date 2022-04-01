import { useQuery } from 'react-query';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { ApiUser } from '../../../models/auth.models';
import { queryKeys } from '../../../react-query/constants';
import { useUser } from '../../auth/hooks/useUser';

const getStudentMain = async (user: ApiUser | null) => {
  try {
    if (!user) return null;
    const { data } = await axiosInstance.get('/student/main', {
      headers: getJWTHeader(user),
    });

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const useMain = () => {
  const { user } = useUser();
  const fallback = [];
  const { data: tests = fallback } = useQuery(queryKeys.STUDENT_MAIN, () =>
    getStudentMain(user)
  );

  return tests;
};
