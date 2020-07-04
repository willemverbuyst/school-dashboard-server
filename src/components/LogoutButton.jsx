import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudentToken } from '../store/student/selectors';
import { selectTeacherToken } from '../store/teacher/selectors';
import { studentLoggingOut } from '../store/student/actions';
import { teacherLoggingOut } from '../store/teacher/actions';
import { Button } from 'antd';

export default function LogoutButton() {
  const history = useHistory();
  const dispatch = useDispatch();
  const teacherToken = useSelector(selectTeacherToken);
  const studentToken = useSelector(selectStudentToken);

  const handleLogOut = () => {
    if (studentToken) {
      dispatch(studentLoggingOut());
    }
    if (teacherToken) {
      dispatch(teacherLoggingOut());
    }
    history.push('/');
  };

  return <Button onClick={handleLogOut}>Logout</Button>;
}
