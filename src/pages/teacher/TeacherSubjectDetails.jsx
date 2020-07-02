import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

export default function TeacherSubjectDetails() {
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
