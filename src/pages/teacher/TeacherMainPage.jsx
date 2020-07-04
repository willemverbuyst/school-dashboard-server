import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from '../../components/charts/BarChart';
import ScatterChart from '../../components/charts/ScatterChart';
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
import { Layout, Row } from 'antd';

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
    for (let i = 0; i < data.length; i++) color.push('rgb(255, 99, 132)');
    const labels = subjects.map(({ name }) => name);

    return data[0] ? (
      <BarChart
        data={data}
        color={color}
        labels={labels}
        title={`AVERAGES PER SUBJECT`}
      />
    ) : (
      <p>YOU HAVE NO DATA TO DISPLAY YET</p>
    );
  };

  const renderScatterChart = () => {
    const color = [];
    const data = [];
    tests.forEach(({ subjectId, result, at }) => {
      color.push('#A026FF');
      data.push({ x: moment(at).format(), y: result });
    });
    return data[0] ? (
      <ScatterChart
        data={data}
        color={color}
        title={
          'AT WHAT TIME OF THE DAY DO STUDENTS TESTS AND WHAT IS THEIR SCORE'
        }
      />
    ) : null;
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row justify="center" style={{ height: '15rem' }}>
            <div>{mainPageData && subjects ? renderChartsMain() : null}</div>
          </Row>
          <Row justify="center">
            <div>{tests && subjects ? renderScatterChart() : null}</div>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
