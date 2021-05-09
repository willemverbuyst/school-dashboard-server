import {
  FETCH_RESULTS_FOR_STUDENT_MAIN,
  REMOVE_RESULTS_FOR_STUDENT_MAIN,
} from './actions';

const initialState = {
  all: null,
};

const overviewStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESULTS_FOR_STUDENT_MAIN:
      return { ...state, all: action.payload };

    case REMOVE_RESULTS_FOR_STUDENT_MAIN:
      return initialState;

    default:
      return state;
  }
};

export default overviewStudentReducer;
