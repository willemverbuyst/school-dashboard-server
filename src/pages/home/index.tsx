import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStudentId } from '../../store/student/selectors';
import { selectTeacherId } from '../../store/teacher/selectors';
import BarChartHome from './BarChartHome';
import LineChartHome from './LineChartHome';
import PolarChartHome from './PolarChartHome';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

const Home = () => {
  const history = useHistory();
  const studentId = useSelector(selectStudentId);
  const teacherId = useSelector(selectTeacherId);

  useEffect(() => {
    if (studentId) {
      history.push(`/students/${studentId}`);
    }
    if (teacherId) {
      history.push(`/teachers/${teacherId}`);
    }
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
              <div style={{ width: '35vw', height: '35vh' }}>
                <BarChartHome />
              </div>
            </Col>
          </Row>
          <Row justify="space-around">
            <Col>
              <div style={{ width: '35vw', height: '35vh' }}>
                <PolarChartHome />
              </div>
            </Col>
            <Col>
              <div style={{ width: '35vw', height: '35vh' }}>
                <LineChartHome />
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
