import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStudentId } from '../store/student/selectors';
import ChartHomePage from '../components/charts/ChartHomePage';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

export default function Home() {
  const history = useHistory();
  const studentId = useSelector(selectStudentId);

  useEffect(() => {
    if (studentId) {
      history.push(`/students/${studentId}`);
    }

    // make same logic happen for teacher
  });

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
          }}
        >
          <Row>
            <h2>Welcome to your dashboard</h2>
          </Row>
          <Row>
            <h3>Please login or sign up</h3>
          </Row>
          <Row>
            <h3>to see you progress</h3>
          </Row>

          <Row justify="space-around">
            <Col>
              <ChartHomePage />
            </Col>
            <Col>
              <ChartHomePage />
            </Col>
            <Col>
              <ChartHomePage />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
