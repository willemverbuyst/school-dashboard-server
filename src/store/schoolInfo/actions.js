import axios from 'axios';
import { apiUrl } from '../../config/constants';

export const FETCH_TEACHERS = 'FETCH_TEACHERS';

export function teacherssFetched(teachers) {
  return {
    type: FETCH_TEACHERS,
    payload: teachers,
  };
}

export async function fetchAllTeachers(dispatch, getState) {
  try {
    const response = await axios.get(`${apiUrl}/school/teachers`, {});
    const teachers = response.data;

    dispatch(teacherssFetched(teachers));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
    } else {
      console.log(error.message);
    }
  }
}
