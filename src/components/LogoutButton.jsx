import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { studentLogginOut } from '../store/student/actions';

import { logOutTeacher } from '../store/teacher/actions';
import { Button } from 'antd';

export default function LogoutButton() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(studentLogginOut());
    dispatch(logOutTeacher());
    history.push('/');
  };

  return <Button onClick={handleLogOut}>Logout</Button>;
}
