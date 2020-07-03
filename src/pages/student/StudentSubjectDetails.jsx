import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
  selectStudentId,
  selectStudentSubjects,
} from '../../store/student/selectors';
import { getResultsForSubject } from '../../store/testResults/actions';
import { selectResultsForSubject } from '../../store/testResults/selectors';
import BarChart from '../../components/charts/BarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';
import { Layout, Button, Row, Col } from 'antd';

// import StudentSubjectChart from './StudentSubjectChart';
const { Content } = Layout;

export default function StudentSubjectDetails() {
  const dispatch = useDispatch();
  const { subjectid } = useParams();
  const history = useHistory();
  const studentId = useSelector(selectStudentId);
  const results = useSelector(selectResultsForSubject);
  const subjects = useSelector(selectStudentSubjects);

  const goTo = (goto) => {
    history.push(goto);
  };

  useEffect(() => {
    dispatch(getResultsForSubject(subjectid));
  }, [dispatch, subjectid]);

  const renderAverage = () => {
    const data = results.map(({ result }) => result);
    const average = Math.round(
      (data.reduce((a, b) => a + b, 0) / (data.length * 3)) * 100
    );
    const color = ['#A026FF', '#eee'];
    return (
      <DoughnutChart
        color={color}
        data={[average, 100 - average]}
        title={`AVERAGE OF ${average}%`}
      />
    );
  };

  const renderAmount = () => {
    const subject = subjects.find((subject) => subject.id === subjectid * 1)
      .name;
    return (
      <>
        <Row>
          <h2>{subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>
        </Row>
        <Row>You have done</Row>
        <Row>
          <span style={{ fontSize: '3.3rem', fontWeight: 'bold' }}>
            {results.length}
          </span>
        </Row>
        <Row>tests so far</Row>
        <Row>
          <Button
            onClick={() =>
              goTo(`/students/${studentId}/subjects/${subjectid}/test`)
            }
          >
            Do a test
          </Button>
        </Row>
      </>
    );
  };

  const renderChart = () => {
    const subject = subjects.find((subject) => subject.id === subjectid * 1)
      .name;
    const data = results.map(({ result }) => result);
    const color = [];
    for (let i = 0; i < results.length; i++) color.push('rgb(255, 99, 132)');
    const labels = results.map(({ at }) => moment(at).format('MMM Do YY'));

    return (
      <BarChart
        data={data}
        color={color}
        labels={labels}
        title={`RESULTS FOR YOUR ${subject.toUpperCase()} TESTS`}
      />
    );
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row>
            <Col>
              <div style={{ width: '35vw', height: '35vh' }}>
                {subjects && results[0] ? (
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
              <div style={{ width: '35vw', height: '35vh' }}>
                {results[0] ? renderAverage() : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ width: '35vw', height: '35vh' }}>
                {subjects && results[0] ? renderChart() : null}
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
