import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectForOverview } from '../../store/overviewTeacher/actions';
import { selectSubjectOverview } from '../../store/overviewTeacher/selectors';
import {
  selectTeacherStudents,
  selectTeacherToken,
} from '../../store/teacher/selectors';
import DoughnutChart from '../../components/charts/DoughnutChart';
import BarChartTest from '../../components/charts/BarChartTest';
import { Layout, Row, Col, Radio } from 'antd';
const { Content } = Layout;

export default function TeacherSubjectDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectTeacherToken);
  const { subjectid } = useParams();
  const results = useSelector(selectSubjectOverview);
  const students = useSelector(selectTeacherStudents);
  const [selectionAverage, setSelectionAverage] = useState('name');
  const [selectionTests, setSelectionTests] = useState('name');

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getSubjectForOverview(subjectid));
  }, [dispatch, subjectid]);

  const renderCharts = () => {
    const sortedResults =
      selectionAverage === 'name'
        ? [...results].sort((a, b) => a.name.localeCompare(b.name))
        : [...results].sort((a, b) => b.score - a.score);

    return sortedResults.map(({ score, name }, i) => (
      <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
        <DoughnutChart
          data={[score, 100 - score]}
          color={['#008080', '#eee']}
          title={`${name} ${score}%`}
        />
      </Col>
    ));
  };

  const renderTestsBar = () => {
    const sortedResults =
      selectionTests === 'name'
        ? [...results].sort((a, b) => a.name.localeCompare(b.name))
        : [...results].sort((a, b) => b.tests - a.tests);

    return sortedResults.map(({ tests, name }, i) => (
      <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
        <BarChartTest
          data={[tests]}
          color={['#008080']}
          labels={[`${name}: ${tests} tests`]}
          title={''}
          max={20}
        />
      </Col>
    ));
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row style={{ paddingBottom: 35 }}>
            AVERAGE GRADES
            <Radio.Group
              size="small"
              onChange={(e) => setSelectionAverage(e.target.value)}
              defaultValue="name"
              style={{ marginLeft: 40 }}
            >
              <Radio.Button value="name">Name</Radio.Button>
              <Radio.Button value="average">Average</Radio.Button>
            </Radio.Group>
          </Row>

          <Row justify={'space-around'}>
            {results && students ? renderCharts() : null}
          </Row>
          <Row style={{ paddingBottom: 35 }}>
            TESTS DONE{' '}
            <Radio.Group
              size="small"
              onChange={(e) => setSelectionTests(e.target.value)}
              defaultValue="name"
              style={{ marginLeft: 40 }}
            >
              <Radio.Button value="name">Name</Radio.Button>
              <Radio.Button value="amount">Amount of Tests</Radio.Button>
            </Radio.Group>
          </Row>
          <Row justify={'space-around'}>
            {results && students ? renderTestsBar() : null}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
