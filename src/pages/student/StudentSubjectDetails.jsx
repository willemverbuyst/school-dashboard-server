import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStudentId } from '../../store/student/selectors';
import { Layout, Button, Row } from 'antd';

// import StudentSubjectChart from './StudentSubjectChart';
const { Content } = Layout;

export default function StudentSubjectDetails() {
  const studentId = useSelector(selectStudentId);
  const { subjectid } = useParams();
  const history = useHistory();

  const goTo = (goto) => {
    history.push(goto);
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row> details for a subject for a student</Row>
          <Row>
            <Button
              onClick={() =>
                goTo(`/students/${studentId}/subjects/${subjectid}/test`)
              }
            >
              Do a test
            </Button>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
