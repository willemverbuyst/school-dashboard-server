import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

export default function TeacherStudentDetails() {
  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          details of student for teacher
        </Content>
      </Layout>
    </Layout>
  );
}
