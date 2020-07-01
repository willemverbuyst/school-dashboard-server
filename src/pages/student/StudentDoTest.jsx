import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudentId } from '../../store/student/selectors';
import { getMcQuestionsForTest } from '../../store/test/actions';
import { select3mcQuestionsForSubject } from '../../store/test/selectors';
import { Layout, Button, Row } from 'antd';
import MultipleChoiceQuestion from '../../components/MultipleChoiceQuestion';

const { Content } = Layout;

export default function StudentDoTest() {
  const dispatch = useDispatch();
  const history = useHistory();
  const studentId = useSelector(selectStudentId);
  const { subjectid } = useParams();
  const questions = useSelector(select3mcQuestionsForSubject);

  const onFinish = () => {
    console.log('you have finished your test');

    history.push(`/students/${studentId}`);
  };

  useEffect(() => {
    dispatch(getMcQuestionsForTest(subjectid));
  }, [dispatch, subjectid]);

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row>
            hello student #{studentId}, a test for subject #{subjectid} arrrggh
          </Row>
          {questions
            ? questions.map(({ text, answers }, i) => (
                <MultipleChoiceQuestion key={i} text={text} answers={answers} />
              ))
            : null}

          <Button onClick={onFinish}>Finish</Button>
        </Content>
      </Layout>
    </Layout>
  );
}
