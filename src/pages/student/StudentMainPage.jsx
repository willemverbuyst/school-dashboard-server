import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudentToken } from '../../store/student/selectors';
import { getResultsForStudentMain } from '../../store/studentMain/actions';
import { selectResultsForStudentMain } from '../../store/studentMain/selectors';
// import Doughnut from '../../components/charts/Dougnut';

import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

export default function StudentMainPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectStudentToken);
  const results = useSelector(selectResultsForStudentMain);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getResultsForStudentMain());
  }, [dispatch]);

  const renderData = () => {
    const subjectIds = [...new Set(results.map((result) => result.subject))];
    const subjectSorted = subjectIds.map((id) =>
      results.filter((result) => result.subject === id)
    );
    console.log(subjectSorted);
  };

  // const renderAverage = () => {
  //   return <Doughnut />;
  // };
  // const renderAmountOfTests = () => {
  //   const amount = results.length;
  //   return <Row>You have done a total of {amount} tests so far</Row>;
  // };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          {/* <Row>
            <Col>{results ? renderAverage() : null}</Col>
          </Row>
          <Row> {results ? renderAmountOfTests() : null}</Row> */}
          {results ? renderData() : null}
        </Content>
      </Layout>
    </Layout>
  );
}
