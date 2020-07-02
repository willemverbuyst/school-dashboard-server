import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudentToken } from '../../store/student/selectors';
import { getResultsForStudentMain } from '../../store/studentMain/actions';

import { Layout } from 'antd';

const { Content } = Layout;

export default function StudentMainPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectStudentToken);

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
        <Content className="site-layout-background">Student Main Page</Content>
      </Layout>
    </Layout>
  );
}
