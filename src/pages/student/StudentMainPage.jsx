import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStudentToken } from '../../store/student/selectors';
import Chart from '../../components/charts/Chart';
import { Layout } from 'antd';

const { Content } = Layout;

export default function StudentMainPage() {
  const history = useHistory();
  const token = useSelector(selectStudentToken);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  return (
    <Layout>
      <Layout style={{ padding: '24px', height: '92vh' }}>
        <Content className="site-layout-background">
          Student Main Page
          <Chart />
        </Content>
      </Layout>
    </Layout>
  );
}
