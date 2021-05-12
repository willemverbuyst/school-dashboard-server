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
import { ReactElement } from 'react';
import renderSideBarNav from '../../components/sidebar/renderSideBarNav';

const { SubMenu } = Menu;
const { Sider } = Layout;

export interface IStudent {
  name: string;
  id: number;
}

export interface ISubject {
  name: string;
  id: number;
}

const SideBar = (): ReactElement => {
  const history = useHistory();
  const subjects: ISubject[] = useSelector(selectTeacherSubjects);
  const students: IStudent[] = useSelector(selectTeacherStudents);
  const teacherId: number = useSelector(selectTeacherId);

  const goTo = (goto: string) => {
    history.push(goto);
  };

  const renderSubjectNav = () =>
    renderSideBarNav('sub2', `/teachers/${teacherId}/subjects`, subjects);

  const renderStudentsNav = () =>
    renderSideBarNav('sub3', `/teachers/${teacherId}/students`, students);

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
          {students ? renderStudentsNav() : null}
        </SubMenu>
        <SubMenu key="sub4" icon={<DatabaseOutlined />} title="Admin">
          <Menu.Item
            key="sub4-2"
            onClick={() => goTo(`/teachers/${teacherId}/questions/list`)}
          >
            List Questions
          </Menu.Item>
          <Menu.Item
            key="sub4-1"
            onClick={() => goTo(`/teachers/${teacherId}/questions/add`)}
          >
            Add Question
          </Menu.Item>
          <Menu.Item
            key="sub4-3"
            onClick={() => goTo(`/teachers/${teacherId}/subject/add`)}
          >
            Add Subject
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SideBar;
