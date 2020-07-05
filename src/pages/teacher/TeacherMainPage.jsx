import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from '../../components/charts/BarChart';
import ScatterChart from '../../components/charts/ScatterChart';
import LineChart from '../../components/charts/LineChart';
import {
  selectTeacherToken,
  selectTeacherId,
  selectTeacherSubjects,
} from '../../store/teacher/selectors';
import { getMainOverview } from '../../store/overviewTeacher/actions';
import {
  selectMainOverview,
  selectMainOverviewScatter,
} from '../../store/overviewTeacher/selectors';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

export default function TeacherMainPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectTeacherToken);
  const id = useSelector(selectTeacherId);
  const mainPageData = useSelector(selectMainOverview);
  const subjects = useSelector(selectTeacherSubjects);
  const tests = useSelector(selectMainOverviewScatter);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getMainOverview(id));
  }, [dispatch, id]);

  const renderChartsMain = () => {
    const data = mainPageData.map(({ result }) => result);
    const color = [];
    for (let i = 0; i < data.length; i++) color.push('#FF5C84');
    const labels = subjects.map(({ name }) => name);

    return data[0] ? (
      <Col style={{ width: 650 }}>
        <BarChart
          data={data}
          color={color}
          labels={labels}
          title={`AVERAGES PER SUBJECT`}
        />
      </Col>
    ) : (
      <p>YOU HAVE NO DATA TO DISPLAY YET</p>
    );
  };

  const renderScatterChart = () => {
    const color = [];
    const data = [];
    tests.forEach(({ subjectId, result, at }) => {
      color.push('#4BC0E7');
      data.push({ x: moment(at).format(), y: result });
    });
    return data[0] ? (
      <Col style={{ width: 450 }}>
        <ScatterChart
          data={data}
          color={color}
          title={
            'AT WHAT TIME OF THE DAY DO STUDENTS TESTS AND WHAT IS THEIR SCORE'
          }
        />
      </Col>
    ) : null;
  };

  const renderLineChart = () => {
    // https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
    const testDates = tests.map((test) => moment(test.at).format('ll'));
    const reducedTests = testDates.reduce(function (prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});
    const labels = Object.keys(reducedTests);
    const data = Object.values(reducedTests);

    return data[0] ? (
      <Col style={{ width: 450 }}>
        <LineChart
          data={data}
          color="#4BC0E7"
          title={'TESTS OVER TIME'}
          labels={labels}
        />
      </Col>
    ) : null;
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row justify="center">
            {mainPageData && subjects ? renderChartsMain() : null}
          </Row>
          <Row justify="space-around">
            {tests && subjects ? renderScatterChart() : null}
            {tests && subjects ? renderLineChart() : null}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
