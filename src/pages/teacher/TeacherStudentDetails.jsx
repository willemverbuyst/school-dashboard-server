import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentForOverview } from '../../store/overviewTeacher/actions';
import { selectStudentOverview } from '../../store/overviewTeacher/selectors';
import {
  selectTeacherSubjects,
  selectTeacherToken,
} from '../../store/teacher/selectors';
import DoughnutChart from '../../components/charts/DoughnutChart';
import BarChartTest from '../../components/charts/BarChartTest';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

export default function TeacherStudentDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectTeacherToken);
  const { studentid } = useParams();
  const results = useSelector(selectStudentOverview);
  const subjects = useSelector(selectTeacherSubjects);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getStudentForOverview(studentid));
  }, [dispatch, studentid]);

  const renderCharts = () => {
    return results.map(({ score, subjectId }, i) => (
      <Col key={i} span={8}>
        <DoughnutChart
          data={[score, 100 - score]}
          color={['#8F1CB8', '#eee']}
          title={`${
            subjects.find((subject) => subject.id === subjectId).name
          } ${score}%`}
        />
      </Col>
    ));
  };

  const renderTestsBar = () => {
    return results.map(({ tests }, i) => (
      <Col key={i} span={8}>
        <BarChartTest
          data={[tests]}
          color={['#8F1CB8']}
          labels={[`${tests} tests`]}
          title={``}
        />
      </Col>
    ));
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row style={{ height: '3rem' }}>AVERAGE GRADES</Row>
          <Row style={{ height: '15rem' }}>
            {results && subjects ? renderCharts() : null}
          </Row>
          <Row style={{ height: '3rem' }}>TESTS DONE</Row>
          <Row style={{ height: '15rem' }}>
            {results && subjects ? renderTestsBar() : null}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
