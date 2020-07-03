import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudentId } from '../../store/student/selectors';
import { getMcQuestionsForTest, submitTest } from '../../store/test/actions';
import { select3mcQuestionsForSubject } from '../../store/test/selectors';
import MultipleChoiceQuestion from '../../components/MultipleChoiceQuestion';
import { Layout, Button, Row } from 'antd';

const { Content } = Layout;

export default function StudentDoTest() {
  const dispatch = useDispatch();
  const history = useHistory();
  const studentId = useSelector(selectStudentId);
  const { subjectid } = useParams();
  const questions = useSelector(select3mcQuestionsForSubject);
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);
  const [answer3, setAnswer3] = useState(0);
  const [question1, setQuestion1] = useState(0);
  const [question2, setQuestion2] = useState(0);
  const [question3, setQuestion3] = useState(0);

  const onFinish = () => {
    dispatch(
      submitTest(
        studentId,
        subjectid,
        question1,
        question2,
        question3,
        answer1,
        answer2,
        answer3
      )
    );
    history.push(`/students/${studentId}/subjects/${subjectid}`);
  };

  const onPick = (e) => {
    if (e.questionNumber * 1 === 1) {
      setQuestion1(e.questionId);
      e.value === 1 || e.value % 4 === 1 ? setAnswer1(1) : setAnswer1(0);
    } else if (e.questionNumber === 2) {
      setQuestion2(e.questionId);
      e.value === 1 || e.value % 4 === 1 ? setAnswer2(1) : setAnswer2(0);
    } else {
      setQuestion3(e.questionId);
      e.value === 1 || e.value % 4 === 1 ? setAnswer3(1) : setAnswer3(0);
    }
  };

  useEffect(() => {
    dispatch(getMcQuestionsForTest(subjectid));
  }, [dispatch, subjectid]);

  const renderMCQ = () => {
    return questions.map(({ text, answers }, i) => (
      <MultipleChoiceQuestion
        key={i}
        text={text}
        answers={answers}
        onPick={onPick}
        questionNumber={i + 1}
      />
    ));
  };

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          <Row>
            hello student #{studentId}, a test for subject #{subjectid} arrrggh
          </Row>
          {questions ? renderMCQ() : null}
          <Button onClick={onFinish}>Finish</Button>
        </Content>
      </Layout>
    </Layout>
  );
}
