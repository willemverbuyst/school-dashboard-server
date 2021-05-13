import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectForOverview } from '../../../store/overviewTeacher/actions';
import { selectSubjectOverview } from '../../../store/overviewTeacher/selectors';
import {
  selectTeacherStudents,
  selectTeacherToken,
} from '../../../store/teacher/selectors';
import { Layout } from 'antd';
import BarChartTests from './BarChartTests';
import DoughnutChartSubject from './DoughnutChartSubject';

const { Content } = Layout;

export default function TeacherSubjectDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectTeacherToken);
  const { subjectid } = useParams();
  const results = useSelector(selectSubjectOverview);
  const students = useSelector(selectTeacherStudents);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getSubjectForOverview(subjectid));
  }, [dispatch, subjectid]);

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          {results && students ? (
            <>
              <BarChartTests results={results} />
              <DoughnutChartSubject results={results} />
            </>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
}
