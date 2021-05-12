import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectStudentSubjects,
  selectStudentId,
} from '../../store/student/selectors';
import { Layout, Menu } from 'antd';
import { ReactElement } from 'react';
import renderSideBarNav from '../../components/sidebar/renderSideBarNav';

const { Sider } = Layout;

const SideBar = (): ReactElement => {
  const history = useHistory();
  const subjects = useSelector(selectStudentSubjects);
  const studentId = useSelector(selectStudentId);

  const goTo = (goto: string) => {
    history.push(goto);
  };

  const renderSubjectNav = () =>
    renderSideBarNav('sub1', `/students/${studentId}/subjects`, subjects);

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
};

export default SideBar;
