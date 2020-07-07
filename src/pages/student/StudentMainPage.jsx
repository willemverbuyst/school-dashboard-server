import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectStudentToken,
  selectStudentSubjects,
} from '../../store/student/selectors';
import { getResultsForStudentMain } from '../../store/overviewStudent/actions';
import { selectResultsForStudentMain } from '../../store/overviewStudent/selectors';
import DoughnutChart from '../../components/charts/DoughnutChart';
import PolarChart from '../../components/charts/PolarChart';
import BarChart from '../../components/charts/BarChart';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

export default function StudentMainPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectStudentToken);
  const results = useSelector(selectResultsForStudentMain);
  const subjects = useSelector(selectStudentSubjects);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getResultsForStudentMain());
  }, [dispatch]);

  const renderData = () => {
    const subjectIds = subjects.map((subject) => subject.id);
    const subjectSorted = subjectIds.map((id) =>
      results.filter((result) => result.subject === id)
    );
    const averages = subjectSorted.map((subject) =>
      Math.round(
        (subject.reduce((a, b) => a + b.result * 1, 0) / (subject.length * 3)) *
          100
      )
    );

    return results[0] ? (
      <>
        <Row justify="space-around">
          <Col style={{ width: 450, paddingBottom: 80 }}>
            {renderAverage(averages)}
          </Col>
          <Col style={{ width: 450, paddingBottom: 80 }}>
            {renderAveragePerSubject(averages)}
          </Col>
        </Row>
        <Row justify="center">
          <Col style={{ width: 650 }}>{renderPolar(subjectSorted)}</Col>
        </Row>
      </>
    ) : (
      <>No data yet</>
    );
  };

  const renderAverage = (averages) => {
    const generalScore = Math.round(
      averages.reduce((a, b) => a + b * 1, 0) / averages.length
    );
    return generalScore ? (
      <DoughnutChart
        data={[generalScore, 100 - generalScore]}
        color={['#8F1CB8', '#eee']}
        title={`YOUR HAVE A GENERAL SCORE OF ${generalScore}%`}
      />
    ) : (
      <p>YOU DON'T HAVE ENOUGH DATA YET TO DISPLAY AVERAGE</p>
    );
  };

  const renderAveragePerSubject = (averages) => {
    const subjectLabel = subjects.map((subject) => subject.name);
    const color = [];
    for (let i = 0; i < averages.length; i++) color.push('#008080');
    return (
      <BarChart
        data={averages}
        labels={subjectLabel}
        color={color}
        title={'AVERAGE SCORE PER SUBJECT'}
        max={100}
      />
    );
  };

  const renderPolar = (subjectSorted) => {
    const data = [];
    subjectSorted.forEach((subject) => data.push(subject.length));
    const labels = subjects.map((subject) => subject.name);
    // https://stackoverflow.com/questions/1152024/best-way-to-generate-a-random-color-in-javascript/1152508
    const color = [];
    subjectSorted.forEach((subject) =>
      color.push(
        '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
      )
    );
    return (
      <PolarChart
        data={data}
        labels={labels}
        color={color}
        title={`You have done a total of ${
          subjectSorted.flat().length
        } tests so far`.toUpperCase()}
      />
    );
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          {results && subjects ? renderData() : null}
        </Content>
      </Layout>
    </Layout>
  );
}
