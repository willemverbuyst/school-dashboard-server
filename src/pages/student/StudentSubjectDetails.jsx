import React, { useEffect, useState } from 'react';
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
import { Layout, Button, Row, Col, Radio } from 'antd';

const { Content } = Layout;

export default function StudentSubjectDetails() {
  const dispatch = useDispatch();
  const { subjectid } = useParams();
  const history = useHistory();
  const token = useSelector(selectStudentToken);
  const studentId = useSelector(selectStudentId);
  const results = useSelector(selectResultsForSubject);
  const subjects = useSelector(selectStudentSubjects);
  const [radio, setRadio] = useState('date');

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
      <Col style={{ width: 450, paddingBottom: 60 }}>
        <DoughnutChart
          color={color}
          data={[average, 100 - average]}
          title={`YOUR AVERAGE IS ${average}%`}
        />
      </Col>
    ) : null;
  };

  const renderAmount = () => {
    return (
      <Col
        style={{
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 60,
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

  const renderTestButton = () => {
    return (
      <Col
        style={{
          width: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 60,
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
          Take a test
        </Button>
      </Col>
    );
  };

  const renderBarChart = () => {
    const subject = subjects.find((subject) => subject.id === subjectid * 1)
      .name;

    const sortedData =
      radio === 'date'
        ? results.sort((a, b) => new Date(a.at) - new Date(b.at))
        : radio === 'lowestFirst'
        ? results.sort((a, b) => a.result - b.result)
        : radio === 'highestFirst'
        ? results.sort((a, b) => b.result - a.result)
        : results;

    const data = sortedData.map(({ result }) => result);
    const color = [];
    for (let i = 0; i < results.length; i++) color.push('rgb(255, 99, 132)');
    const labels = results.map(({ at }) => moment(at).format('MMM Do YY'));

    return color[0] ? (
      <>
        <Row style={{ paddingBottom: 15 }}>
          <Radio.Group size="small" onChange={(e) => setRadio(e.target.value)}>
            <Radio.Button style={{ marginRight: 5 }} value="date">
              Scores by data
            </Radio.Button>
            <Radio.Button style={{ marginRight: 5 }} value="lowestFirst">
              Scores Low to High
            </Radio.Button>
            <Radio.Button style={{ marginRight: 5 }} value="highestFirst">
              Scores High to Low
            </Radio.Button>
          </Radio.Group>
        </Row>
        <Row justify="center">
          <Col style={{ width: 650 }}>
            <BarChart
              data={data}
              color={color}
              labels={labels}
              title={`RESULTS FOR YOUR ${subject.toUpperCase()} TESTS`}
            />
          </Col>
        </Row>
      </>
    ) : null;
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row justify="space-around">
            {subjects && results ? renderAmount() : null}
            {subjects && results ? renderAverage() : null}
            {subjects && results ? renderTestButton() : null}
          </Row>
          {subjects && results ? renderBarChart() : null}
        </Content>
      </Layout>
    </Layout>
  );
}
