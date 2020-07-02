import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { selectStudentId } from '../../store/student/selectors';
import { getResultsForSubject } from '../../store/testResults/actions';
import { selectResultsForSubject } from '../../store/testResults/selectors';
import BarChart from '../../components/charts/BarChart';
import { Layout, Button, Row } from 'antd';

// import StudentSubjectChart from './StudentSubjectChart';
const { Content } = Layout;

export default function StudentSubjectDetails() {
  const dispatch = useDispatch();
  const studentId = useSelector(selectStudentId);
  const results = useSelector(selectResultsForSubject);
  const { subjectid } = useParams();
  const history = useHistory();

  const goTo = (goto) => {
    history.push(goto);
  };

  useEffect(() => {
    dispatch(getResultsForSubject(subjectid));
  }, [dispatch, subjectid]);

  const renderChart = () => {
    const data = results.map(({ result }) => result);
    const color = [];
    for (let i = 0; i < results.length; i++) color.push('rgb(255, 99, 132)');
    const labels = results.map(({ at }) => moment(at).format('MMM Do YY'));

    return <BarChart data={data} color={color} labels={labels} />;
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row> details for a subject for a student</Row>
          <Row>
            <Button
              onClick={() =>
                goTo(`/students/${studentId}/subjects/${subjectid}/test`)
              }
            >
              Do a test
            </Button>
          </Row>
          <div style={{ width: '35vw', height: '35vh' }}>
            {results ? renderChart() : null}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
