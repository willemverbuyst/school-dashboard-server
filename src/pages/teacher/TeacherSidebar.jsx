import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectTeacherStudents,
  selectTeacherSubjects,
  selectTeacherId,
} from '../../store/teacher/selectors';
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
  const subjects = useSelector(selectTeacherSubjects);
  const students = useSelector(selectTeacherStudents);
  const teacherId = useSelector(selectTeacherId);

  const goTo = (goto) => {
    history.push(goto);
  };

  const renderSubjectNav = () => {
    return subjects.map(({ name, id }, i) => (
      <Menu.Item
        key={`sub2-${i + 1}`}
        onClick={() => goTo(`/teachers/${teacherId}/subjects/${id}`)}
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Menu.Item>
    ));
  };

  const renderStudentNav = () => {
    return students.map(({ name, id }, i) => (
      <Menu.Item
        key={`sub3-${i + 1}`}
        onClick={() => goTo(`/teachers/${teacherId}/students/${id}`)}
      >
        {name}
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
        <SubMenu key="sub4" icon={<DatabaseOutlined />} title="Questions">
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
