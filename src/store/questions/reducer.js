import { FETCH_QUESTIONS, REMOVE_QUESTIONS, ADD_QUESTION } from './actions';

const initialState = {
  all: null,
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return { ...state, all: action.payload.data };

    case ADD_QUESTION:
      return { ...state, all: [...state.all, action.payload.data] };

    case REMOVE_QUESTIONS:
      return initialState;

    default:
      return state;
  }
};

export default questionsReducer;
