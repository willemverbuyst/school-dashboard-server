import { teacherssFetched, fetchAllTeachers, FETCH_TEACHERS } from '../actions';

// import {
//   appDoneLoading,
//   clearMessage,
//   setMessage,
//   showMessageWithTimeout,
// } from '../../appState/actions';
// import axios from 'axios';

describe('fteacherssFetched', () => {
  describe('if given an array with teachers', () => {
    test('should return an action array containing teacher object', () => {
      const teachers = [{}, {}];
      const expected = {
        type: FETCH_TEACHERS,
        payload: [{}, {}],
      };
      expect(teacherssFetched(teachers)).toEqual(expected);
    });
    test('the payload of whats returned should have the same length as the teachers array', () => {
      const teachers = [{}, {}];
      const action = teacherssFetched(teachers);
      expect(action.payload).toHaveLength(teachers.length);
    });
    test('the payload of whats returned should contain objects with the same value as the teachers array', () => {
      const teachers = [{ test: 'test' }, { test: 'test' }];
      const action = teacherssFetched(teachers);
      expect(action.payload).toEqual(teachers);
    });
  });
});
