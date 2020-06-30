import React from 'react';
import { useHistory } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  DatabaseOutlined,
  HomeOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

export default function SideBar() {
  const history = useHistory();
  const subjects = ['geography', 'history', 'math'];
  const students = ['piet', 'sjaak', 'ann'];
  const teacherId = 1;
  // id will come with the subject from the back is hc for now
  const id = 1;

  const goTo = (goto) => {
    history.push(goto);
  };

  const renderSubjectNav = () => {
    return subjects.map((subject, i) => (
      <Menu.Item
        key={`sub2-${i + 1}`}
        onClick={() => goTo(`/teachers/${teacherId}/subjects/${id}`)}
      >
        {subject.charAt(0).toUpperCase() + subject.slice(1)}
      </Menu.Item>
    ));
  };

  const renderStudentNav = () => {
    return students.map((student, i) => (
      <Menu.Item
        key={`sub3-${i + 1}`}
        onClick={() => goTo(`/teachers/${teacherId}/students/${id}`)}
      >
        {student}
      </Menu.Item>
    ));
  };

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item
          key="sub1"
          icon={<HomeOutlined />}
          onClick={() => goTo('/teachers/1')}
        >
          Home
        </Menu.Item>
        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Subjects">
          {subjects ? renderSubjectNav() : null}
        </SubMenu>
        <SubMenu key="sub3" icon={<UserOutlined />} title="Students">
          {students ? renderStudentNav() : null}
        </SubMenu>
        <SubMenu key="sub4" icon={<DatabaseOutlined />} title="Tests">
          <Menu.Item
            key="sub4-1"
            onClick={() => goTo(`/teachers/${teacherId}/questions/add`)}
          >
            Add
          </Menu.Item>
          <Menu.Item
            key="sub4-2"
            onClick={() => goTo(`/teachers/${teacherId}/questions/list`)}
          >
            List
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
