import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStudentId } from '../store/student/selectors';
import PolarChart from '../components/charts/PolarChart';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
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
          <Row justify="space-around">
            <Col>
              <BarChart />
            </Col>
            <Col>
              <PolarChart />
            </Col>
            <Col>
              <LineChart />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
