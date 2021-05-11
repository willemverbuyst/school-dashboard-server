import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectStudentId,
  selectStudentSubjects,
  selectStudentToken,
} from '../../../store/student/selectors';
import { getResultsForSubject } from '../../../store/testResults/actions';
import { selectResultsForSubject } from '../../../store/testResults/selectors';

import { Layout, Button, Row, Col } from 'antd';
import DoughnutChartDetails from './DoughnutChartDetails';
import BarChartDetails from './BarChartDetails';

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

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          {subjects && results ? (
            <>
              <Row justify="space-around">
                {subjects && results ? renderAmount() : null}
                <Col style={{ width: 450, paddingBottom: 60 }}>
                  <DoughnutChartDetails results={results} />
                </Col>
                {subjects && results ? renderTestButton() : null}
              </Row>
              <BarChartDetails
                results={results}
                subjects={subjects}
                subjectId={subjectid}
              />
            </>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
}
