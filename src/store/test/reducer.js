import { FETCH_MC_QUESTIONS } from './actions';

const initialState = {
  all: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MC_QUESTIONS:
      return { ...state, all: action.payload };
    default:
      return state;
  }
};
