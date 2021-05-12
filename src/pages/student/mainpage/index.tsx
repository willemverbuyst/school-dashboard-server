import { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectStudentToken,
  selectStudentSubjects,
} from '../../../store/student/selectors';
import { getResultsForStudentMain } from '../../../store/overviewStudent/actions';
import { selectResultsForStudentMain } from '../../../store/overviewStudent/selectors';
import { Layout } from 'antd';
import AllCharts from './AllChartsMain';

const { Content } = Layout;

const StudentMainPage = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectStudentToken);
  const results = useSelector(selectResultsForStudentMain);
  const subjects = useSelector(selectStudentSubjects);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getResultsForStudentMain());
  }, [dispatch]);

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          {subjects && results ? (
            <AllCharts subjects={subjects} results={results} />
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentMainPage;
