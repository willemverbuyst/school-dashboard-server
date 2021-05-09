import { FETCH_TEACHERS } from './actions';

const initialState = {
  teachers: null,
};

const schoolInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEACHERS:
      return { ...state, teachers: action.payload };

    default:
      return state;
  }
};

export default schoolInfoReducer;
