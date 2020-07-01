import { FETCH_MC_QUESTIONS, ERASE_TEST } from './actions';

const initialState = {
  all: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MC_QUESTIONS:
      return { ...state, all: state.all.concat(action.payload) };
    case ERASE_TEST:
      return initialState;
    default:
      return state;
  }
};
