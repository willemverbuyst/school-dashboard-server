import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

export default function StudentSubjectDetails() {
  return (
    <Layout>
      <Layout style={{ padding: '24px', height: '92vh' }}>
        <Content className="site-layout-background">
          details for a subject for a student
        </Content>
      </Layout>
    </Layout>
  );
}
