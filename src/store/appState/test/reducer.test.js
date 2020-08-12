import reducer from '../reducer';
import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from '../actions';

describe('userReducer', () => {
  const initialState = {
    loading: false,
    message: null,
  };
  describe('if given no state and a random action', () => {
    test('returns the inital state', () => {
      const newState = reducer(undefined, { type: 'RANDOM' });
      expect(newState).toEqual(initialState);
    });
    test('returns the inital state', () => {
      const newState = reducer(undefined, { type: 'RANDOM' });
      expect(newState.loading).toBe(false);
      expect(newState.message).toBeNull;
    });
  });
  describe('when given a SET_MESSAGE action type', () => {
    test('returns a new state with the payload containing correct values', () => {
      const newMessage = 'test_message';
      const action = { type: SET_MESSAGE, payload: newMessage };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({ loading: false, message: newMessage });
      expect(newState.message).toBe(newMessage);
      expect(newState.loading).toBe(false);
    });
  });
  describe('when given a CLEAR_MESSAGE action type', () => {
    test('returns a new state with the message set to null', () => {
      const action = { type: CLEAR_MESSAGE };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({ loading: false, message: null });
      expect(newState.message).toBeNull;
      expect(newState.loading).toBe(false);
    });
  });
  describe('when given APP_LOADING action type', () => {
    test('returns a new state with loading set to true', () => {
      const action = { type: APP_LOADING };
      const newState = reducer(initialState, action);
      expect(newState).toEqual({ loading: true, message: null });
      expect(newState.loading).toBe(true);
    });
  });
  describe('when given APP_DONE_LOADING action type', () => {
    test('returns a new state with loading set to false', () => {
      const action1 = { type: APP_LOADING };
      const action2 = { type: APP_DONE_LOADING };
      const newState = reducer(initialState, action1);
      const newDoneState = reducer(newState, action2);
      expect(newState).toEqual({ loading: true, message: null });
      expect(newDoneState.loading).toBe(false);
    });
  });
});
