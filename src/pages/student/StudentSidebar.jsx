import React from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

export default function SideBar() {
  const history = useHistory();
  // data is hardcoded for now
  const subjects = ['geography', 'history', 'math'];
  const studentId = 1;

  const goTo = (goto) => {
    history.push(goto);
  };

  const renderSubjectNav = () => {
    return subjects.map((x, i) => (
      <Menu.Item
        key={i + 2}
        onClick={() => goTo(`/students/${studentId}/subjects/${i + 1}`)}
      >
        {x.charAt(0).toUpperCase() + x.slice(1)}
      </Menu.Item>
    ));
  };

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" onClick={() => goTo(`/students/${studentId}`)}>
          Home
        </Menu.Item>
        {subjects ? renderSubjectNav() : null}
      </Menu>
    </Sider>
  );
}
