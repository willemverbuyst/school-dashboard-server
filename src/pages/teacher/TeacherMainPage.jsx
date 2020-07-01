import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTeacherToken } from '../../store/teacher/selectors';
//import Chart from '../../components/charts/Chart';
import { Layout } from 'antd';

const { Content } = Layout;

export default function TeacherMainPage() {
  const history = useHistory();
  const token = useSelector(selectTeacherToken);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          Teacher Main Page
          {/* <Chart /> */}
        </Content>
      </Layout>
    </Layout>
  );
}
