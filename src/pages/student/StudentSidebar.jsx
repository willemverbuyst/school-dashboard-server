import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectStudentSubjects,
  selectStudentId,
} from '../../store/student/selectors';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

export default function SideBar() {
  const history = useHistory();
  const subjects = useSelector(selectStudentSubjects);
  const studentId = useSelector(selectStudentId);

  const goTo = (goto) => {
    history.push(goto);
  };

  const renderSubjectNav = () => {
    return subjects.map(({ name, id }, i) => (
      <Menu.Item
        key={i + 2}
        onClick={() => goTo(`/students/${studentId}/subjects/${id}`)}
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
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
