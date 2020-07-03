import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from '../../components/charts/BarChart';
import {
  selectTeacherToken,
  selectTeacherId,
  selectTeacherSubjects,
} from '../../store/teacher/selectors';
import { getMainOverview } from '../../store/overviewTeacher/actions';
import { selectMainOverview } from '../../store/overviewTeacher/selectors';
import { Layout } from 'antd';

const { Content } = Layout;

export default function TeacherMainPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectTeacherToken);
  const id = useSelector(selectTeacherId);
  const mainPageData = useSelector(selectMainOverview);
  const subjects = useSelector(selectTeacherSubjects);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getMainOverview(id));
  }, [dispatch, id]);

  const renderChartsMain = () => {
    const data = mainPageData.map(({ result }) => result);
    const color = [];
    for (let i = 0; i < data.length; i++) color.push('rgb(255, 99, 132)');
    const labels = subjects.map(({ name }) => name);

    return (
      <BarChart
        data={data}
        color={color}
        labels={labels}
        title={`AVERAGES PER SUBJECT`}
      />
    );
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          {mainPageData && subjects ? renderChartsMain() : null}
        </Content>
      </Layout>
    </Layout>
  );
}
