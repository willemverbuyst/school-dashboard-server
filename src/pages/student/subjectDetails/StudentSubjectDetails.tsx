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
import NumberOfTests from './NumberOfTests';

const { Content } = Layout;

export default function StudentSubjectDetails() {
  const dispatch = useDispatch();
  const { subjectid } = useParams<{ subjectid: string }>();
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

  const goTo = (goto: string) => {
    history.push(goto);
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
                <NumberOfTests results={results} />

                <DoughnutChartDetails results={results} />

                {renderTestButton()}
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
