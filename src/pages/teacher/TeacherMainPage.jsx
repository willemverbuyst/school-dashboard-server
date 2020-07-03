import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Chart from '../../components/charts/Chart';
import {
  selectTeacherToken,
  selectTeacherId,
} from '../../store/teacher/selectors';
import { getMainOverview } from '../../store/overviewTeacher/actions';

import { Layout } from 'antd';

const { Content } = Layout;

export default function TeacherMainPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectTeacherToken);
  const id = useSelector(selectTeacherId);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getMainOverview(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          Teacher Main Page
          <Chart />
        </Content>
      </Layout>
    </Layout>
  );
}
