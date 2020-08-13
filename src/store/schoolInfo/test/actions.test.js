import { teachersFetched, fetchAllTeachers, FETCH_TEACHERS } from '../actions';
import { appLoading, appDoneLoading, setMessage } from '../../appState/actions';
import axios from 'axios';

describe('fteachersFetched', () => {
  describe('if given an array with teachers', () => {
    test('should return an action array containing teacher object', () => {
      const teachers = [{}, {}];
      const expected = {
        type: FETCH_TEACHERS,
        payload: [{}, {}],
      };
      expect(teachersFetched(teachers)).toEqual(expected);
    });
    test('the payload of whats returned should have the same length as the teachers array', () => {
      const teachers = [{}, {}];
      const action = teachersFetched(teachers);
      expect(action.payload).toHaveLength(teachers.length);
    });
    test('the payload of whats returned should contain objects with the same value as the teachers array', () => {
      const teachers = [{ test: 'test' }, { test: 'test' }];
      const action = teachersFetched(teachers);
      expect(action.payload).toEqual(teachers);
    });
  });
});

jest.mock('axios');

describe('fetchAllTeachers', () => {
  describe('when called', () => {
    test('should dispatch an action teachers', async () => {
      const fakeTeachers = [{}, {}];
      const response = { data: fakeTeachers };
      axios.get.mockImplementationOnce(() => Promise.resolve(response));
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce([]);
      await fetchAllTeachers(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(appLoading());
      expect(dispatch).toHaveBeenCalledWith(teachersFetched(fakeTeachers));
      expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
  describe('when called and fails', () => {
    test('should dispatch setMessage with error', async () => {
      const fakeTeachers = [{}, {}];
      const text = 'response is not defined';
      const variant = 'danger';
      const dismissable = true;
      const error = { response: true };

      axios.get.mockImplementationOnce(() => Promise.reject(response));
      const dispatch = jest.fn();
      const getState = jest.fn().mockReturnValueOnce([]);
      await fetchAllTeachers(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith(appLoading());
      if (error.response) {
        expect(dispatch).toHaveBeenCalledWith(
          setMessage(variant, dismissable, text)
        );
      }
      expect(dispatch).not.toHaveBeenCalledWith(teachersFetched(fakeTeachers));
      expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
});
