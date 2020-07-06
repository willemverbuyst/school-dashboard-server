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
      <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
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
    return results.map(({ tests, subjectId }, i) => (
      <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
        <BarChartTest
          data={[tests]}
          color={['#8F1CB8']}
          labels={[
            `${
              subjects.find((subject) => subject.id === subjectId).name
            }: ${tests} tests`,
          ]}
          title={``}
        />
      </Col>
    ));
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row style={{ paddingBottom: 35 }}>AVERAGE GRADES</Row>
          <Row justify={'space-around'}>
            {results && subjects ? renderCharts() : null}
          </Row>
          <Row style={{ paddingBottom: 35 }}>TESTS DONE</Row>
          <Row justify={'space-around'}>
            {results && subjects ? renderTestsBar() : null}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
