import {
  FETCH_OVERVIEW_FOR_SUBJECT,
  FETCH_OVERVIEW_FOR_STUDENT,
  FETCH_OVERVIEW_FOR_MAIN,
  REMOVE_OVERVIEW,
} from './actions';

const initialState = {
  subjects: null,
  students: null,
  main: { scores: null, tests: null },
};

const overviewTeacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OVERVIEW_FOR_SUBJECT:
      return { ...state, subjects: action.payload.data };

    case FETCH_OVERVIEW_FOR_STUDENT:
      return { ...state, students: action.payload.data };

    case FETCH_OVERVIEW_FOR_MAIN:
      return {
        ...state,
        main: {
          scores: action.payload.data.scores,
          tests: action.payload.data.tests,
        },
      };

    case REMOVE_OVERVIEW:
      return initialState;

    default:
      return state;
  }
};

export default overviewTeacherReducer;
