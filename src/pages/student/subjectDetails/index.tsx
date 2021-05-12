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
import { Layout, Row } from 'antd';
import DoughnutChartDetails from './DoughnutChartDetails';
import BarChartDetails from './BarChartDetails';
import NumberOfTests from './NumberOfTests';
import TestButton from './TestButton';

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

  const goTo = (): void => {
    history.push(`/students/${studentId}/subjects/${subjectid}/test`);
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
                <TestButton goTo={goTo} />
              </Row>
              <Row>
                <BarChartDetails
                  results={results}
                  subjects={subjects}
                  subjectId={subjectid}
                />
              </Row>
            </>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
}
