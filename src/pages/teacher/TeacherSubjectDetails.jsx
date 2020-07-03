import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSubjectForOverview } from '../../store/overviewTeacher/actions';
import { Layout } from 'antd';
const { Content } = Layout;

export default function TeacherSubjectDetails() {
  const dispatch = useDispatch();
  const { subjectid } = useParams();

  useEffect(() => {
    dispatch(getSubjectForOverview(subjectid));
  }, [dispatch, subjectid]);

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          details of subject for teacher
        </Content>
      </Layout>
    </Layout>
  );
}
