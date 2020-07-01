import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStudentId } from '../../store/student/selectors';
import { Layout, Button, Row } from 'antd';
import MultipleChoiceQuestion from '../../components/MultipleChoiceQuestion';

const { Content } = Layout;

export default function StudentDoTest() {
  const studentId = useSelector(selectStudentId);
  const { subjectid } = useParams();
  const history = useHistory();

  const onFinish = () => {
    console.log('you have finished your test');

    history.push(`/students/${studentId}`);
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row>
            hello student #{studentId}, a test for subject #{subjectid} arrrggh
          </Row>
          <MultipleChoiceQuestion />
          <MultipleChoiceQuestion />
          <MultipleChoiceQuestion />
          <Button onClick={onFinish}>Finish</Button>
        </Content>
      </Layout>
    </Layout>
  );
}
