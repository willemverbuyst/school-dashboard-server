import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
  selectStudentId,
  selectStudentSubjects,
  selectStudentToken,
} from '../../store/student/selectors';
import { getResultsForSubject } from '../../store/testResults/actions';
import { selectResultsForSubject } from '../../store/testResults/selectors';
import BarChart from '../../components/charts/BarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';
import { Layout, Button, Row, Col } from 'antd';

const { Content } = Layout;

export default function StudentSubjectDetails() {
  const dispatch = useDispatch();
  const { subjectid } = useParams();
  const history = useHistory();
  const token = useSelector(selectStudentToken);
  const studentId = useSelector(selectStudentId);
  const results = useSelector(selectResultsForSubject);
  const subjects = useSelector(selectStudentSubjects);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getResultsForSubject(subjectid));
  }, [dispatch, subjectid]);

  const goTo = (goto) => {
    history.push(goto);
  };

  const renderAverage = () => {
    const data = results.map(({ result }) => result);
    const average = Math.round(
      (data.reduce((a, b) => a + b, 0) / (data.length * 3)) * 100
    );
    const color = ['#A026FF', '#eee'];
    return average ? (
      <Col style={{ width: 450 }}>
        <DoughnutChart
          color={color}
          data={[average, 100 - average]}
          title={`YOUR AVERAGE IS ${average}%`}
        />
      </Col>
    ) : null;
  };

  const renderAmount = () => {
    const subject = subjects.find((subject) => subject.id === subjectid * 1)
      .name;
    return (
      <Col
        style={{
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '1.4rem' }}>You have done</div>
        <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>
          {results.length}
        </div>
        <div style={{ fontSize: '1.4rem' }}>tests so far</div>
      </Col>
    );
  };

  const renderNoTestsYet = () => {
    return (
      <Col>
        <h2>No results yet.</h2>
        <Button
          onClick={() =>
            goTo(`/students/${studentId}/subjects/${subjectid}/test`)
          }
        >
          Do a test
        </Button>
      </Col>
    );
  };

  const renderTestButton = () => {
    return (
      <Col
        style={{
          width: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          shape="circle"
          onClick={() =>
            goTo(`/students/${studentId}/subjects/${subjectid}/test`)
          }
          style={{
            height: 120,
            width: 120,
            border: '2px solid #B81D9D',
            color: '#B81D9D',
            fontSize: '1.4rem',
          }}
        >
          Do a test
        </Button>
      </Col>
    );
  };

  const renderBarChart = () => {
    const subject = subjects.find((subject) => subject.id === subjectid * 1)
      .name;
    const data = results.map(({ result }) => result);
    const color = [];
    for (let i = 0; i < results.length; i++) color.push('rgb(255, 99, 132)');
    const labels = results.map(({ at }) => moment(at).format('MMM Do YY'));

    return color[0] ? (
      <Col style={{ width: 650 }}>
        <BarChart
          data={data}
          color={color}
          labels={labels}
          title={`RESULTS FOR YOUR ${subject.toUpperCase()} TESTS`}
        />
      </Col>
    ) : null;
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row justify="space-around">
            {subjects && results ? renderAmount() : renderNoTestsYet()}
            {results ? renderAverage() : null}
            {renderTestButton()}
          </Row>
          <Row justify="center" style={{ paddingTop: 80 }}>
            {subjects && results ? renderBarChart() : null}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
