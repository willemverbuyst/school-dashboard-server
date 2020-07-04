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
import DoTestButton from '../../components/DoTestButton';
import { Layout, Button, Row, Col, Card } from 'antd';

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
      <Card
        title={`Your average is ${average}%`}
        bordered={false}
        style={{ width: 300, height: 250, textAlign: 'center' }}
      >
        <DoughnutChart color={color} data={[average, 100 - average]} />
      </Card>
    ) : null;
  };

  const renderAmount = () => {
    const subject = subjects.find((subject) => subject.id === subjectid * 1)
      .name;
    return (
      <Card
        title={subject.charAt(0).toUpperCase() + subject.slice(1)}
        bordered={false}
        style={{ width: 300, height: 250, textAlign: 'center' }}
      >
        <p>You have done</p>
        <span style={{ fontSize: '3.3rem', fontWeight: 'bold' }}>
          {results.length}
        </span>
        <p>tests so far</p>
      </Card>
    );
  };

  const renderTestButton = () => {
    return (
      <Card
        title="Did you study?"
        bordered={false}
        style={{
          width: 300,
          height: 250,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() =>
            goTo(`/students/${studentId}/subjects/${subjectid}/test`)
          }
        >
          Do a test
        </div>
      </Card>
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
      <BarChart
        data={data}
        color={color}
        labels={labels}
        title={`RESULTS FOR YOUR ${subject.toUpperCase()} TESTS`}
      />
    ) : null;
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row justify="space-around">
            <Col>
              <div>
                {subjects && results ? (
                  renderAmount()
                ) : (
                  <>
                    <h2>No results yet.</h2>
                    <Row>
                      <Button
                        onClick={() =>
                          goTo(
                            `/students/${studentId}/subjects/${subjectid}/test`
                          )
                        }
                      >
                        Do a test
                      </Button>
                    </Row>
                  </>
                )}
              </div>
            </Col>
            <Col>
              <div>{results ? renderAverage() : null}</div>
            </Col>
            <Col>{renderTestButton()}</Col>
          </Row>
          <Row justify="center">
            <Col>
              <div style={{ width: '50vw', height: '15vh' }}>
                {subjects && results ? renderBarChart() : null}
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
