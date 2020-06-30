import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { Layout } from 'antd';

const { Header } = Layout;

export default function BarAtThetop() {
  // get student and teacher from the redux store with selector
  const student = null;
  // const student = 'Sifan Hassan';
  // const teacher = 'Dostojewski';
  const teacher = null;

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
      <Link style={{ color: '#fff' }} to="/">
        Dashboard
      </Link>
      {renderWelcome()}
      {renderLoginLogout()}
    </Header>
  );
}
