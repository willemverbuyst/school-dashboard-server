import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import { Layout } from 'antd';

const { Header } = Layout;

export default function BarAtThetop() {
  const student = null;
  const teacher = 'Dostojewski';

  const renderLoginLogout = () => {
    return <LoginButton />;
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
