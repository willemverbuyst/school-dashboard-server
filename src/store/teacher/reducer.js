import {
  LOG_OUT_TEACHER,
  LOGIN_SUCCESS_TEACHER,
  TOKEN_STILL_VALID_TEACHER,
  ADD_SUBJECT,
} from './actions';

const initialState = {
  token: localStorage.getItem('teacher_token'),
  name: null,
  email: null,
  id: null,
  students: null,
  subjects: null,
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS_TEACHER:
      const { data, token } = action.payload;
      localStorage.setItem('teacher_token', token);
      return {
        ...state,
        token: token,
        name: data.teacher.name,
        email: data.teacher.email,
        id: data.teacher.id,
        students: data.students,
        subjects: data.subjects,
      };

    case LOG_OUT_TEACHER:
      localStorage.removeItem('teacher_token');
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID_TEACHER:
      return {
        ...state,
        token: token,
        name: data.teacher.name,
        email: data.teacher.email,
        id: data.teacher.id,
        students: data.students,
        subjects: data.subjects,
      };

    case ADD_SUBJECT:
      if (state.subjects) {
        return { ...state, subjects: [...state.subjects, data.subjects] };
      } else {
        return { ...state, subjects: [data.subjects] };
      }

    default:
      return state;
  }
};

export default teacherReducer;
