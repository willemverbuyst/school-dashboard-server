import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectStudentToken,
  selectStudentSubjects,
} from '../../store/student/selectors';
import { getResultsForStudentMain } from '../../store/studentMain/actions';
import { selectResultsForStudentMain } from '../../store/studentMain/selectors';
// import Doughnut from '../../components/charts/Dougnut';
import PolarChart from '../../components/charts/PolarChart';

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

    return (
      <Row>
        <Col>
          <Row>
            You have done a total of {subjectSorted.flat().length} tests so far
          </Row>
          <div style={{ width: '35vw', height: '35vh' }}>
            {renderPolar(subjectSorted)}
          </div>
        </Col>
      </Row>
    );
  };

  // const renderAverage = () => {
  //   return <Doughnut />;
  // };
  // const renderAmountOfTests = () => {
  //   const amount = results.length;
  //   return <Row>You have done a total of {amount} tests so far</Row>;
  // };

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
    return <PolarChart data={data} labels={labels} color={color} />;
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          {/* <Row>
            <Col>{results ? renderAverage() : null}</Col>
          </Row>
          <Row> {results ? renderAmountOfTests() : null}</Row> */}
          {results && subjects ? renderData() : null}
        </Content>
      </Layout>
    </Layout>
  );
}
