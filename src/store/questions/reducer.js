import { FETCH_QUESTIONS, REMOVE_QUESTIONS } from './actions';

const initialState = {
  all: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return { ...state, all: action.payload };
    case REMOVE_QUESTIONS:
      return initialState;
    default:
      return state;
  }
};
