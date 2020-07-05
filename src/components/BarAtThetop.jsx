import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { selectStudentName } from '../store/student/selectors';
import { selectTeacherName } from '../store/teacher/selectors';
import { Layout } from 'antd';

const { Header } = Layout;

export default function BarAtThetop() {
  const student = useSelector(selectStudentName);
  const teacher = useSelector(selectTeacherName);

  const renderLoginLogout = () => {
    return student || teacher ? <LogoutButton /> : <LoginButton />;
  };

  const renderWelcome = () => {
    return student ? (
      <div>Welcome {student}!</div>
    ) : teacher ? (
      <div>Welcome {teacher}!</div>
    ) : null;
  };

  const renderDate = () => {
    return moment().format('MMMM Do YYYY, dddd');
  };

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '8vh',
        color: '#fff',
      }}
    >
      <Link
        style={{
          color: '#fff',
          fontFamily: 'Sriracha',
          fontSize: '2rem',
          transform: 'rotate(-5deg)',
        }}
        to="/"
      >
        Dashboard
      </Link>
      {renderDate()}
      {renderWelcome()}
      {renderLoginLogout()}
    </Header>
  );
}
