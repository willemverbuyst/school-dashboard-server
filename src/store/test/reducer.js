import { FETCH_MC_QUESTIONS, REMOVE_MC_QUESTIONS } from './actions';

const initialState = {
  all: null,
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MC_QUESTIONS:
      return { ...state, all: action.payload };

    case REMOVE_MC_QUESTIONS:
      return initialState;

    default:
      return state;
  }
};

export default testReducer;
