import React from 'react';
import { Link } from 'react-router-dom';

import { Layout } from 'antd';

const { Header } = Layout;

export default function BarAtThetop() {
  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '8vh',
      }}
    >
      <Link style={{ color: '#fff' }} to="/">
        Dashboard
      </Link>
      {/* {renderWelcome()}
      {renderLoginLogout()} */}
    </Header>
  );
}
