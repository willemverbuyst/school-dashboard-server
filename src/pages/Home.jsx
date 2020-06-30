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
              <div style={{ width: '30vw', height: '30vh' }}>
                <BarChart
                  labels={['Welcome', 'to', 'your', 'dashboard']}
                  color="rgba(0, 99, 132, 1)"
                  data={[80, 56, 67, 45]}
                />
              </div>
            </Col>
          </Row>
          <Row justify="space-around">
            <Col>
              <PolarChart
                labels={['Please', 'log', 'in']}
                color={[
                  'rgba(55, 99, 1, 1)',
                  'rgba(2, 99, 132, 1)',
                  'rgba(20, 200, 0, 1)',
                ]}
                data={[80, 56, 67]}
              />
            </Col>
            <Col>
              <LineChart
                labels={['to', 'see', 'your', 'progress']}
                color={['rgba(75, 192, 192, .6)']}
                data={[45, 67, 56, 80]}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
