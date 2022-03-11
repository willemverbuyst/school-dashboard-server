import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import NavigationPrompt from 'react-router-navigation-prompt';
import { useDispatch, useSelector } from 'react-redux';
import MultipleChoiceQuestion from '../../../components/MultipleChoiceQuestion';
import {
  selectStudentId,
  selectStudentSubjects,
  selectStudentToken,
} from '../../../store/student/selectors';
import { getMcQuestionsForTest, submitTest } from '../../../store/test/actions';
import { select3mcQuestionsForSubject } from '../../../store/test/selectors';
import { Layout, Button, Modal } from 'antd';

const { Content } = Layout;

interface TestResult {
  question1: number;
  question2: number;
  question3: number;
  answer1: string;
  answer2: string;
  answer3: string;
}

interface IMultipleChoiceAnswer {
  id: number;
  text: string;
  correct: boolean;
  questionId: number;
}

interface IMultipleChoiceQuestion {
  id: number;
  text: string;
  subjectId: number;
  answers: IMultipleChoiceAnswer[];
}

export default function StudentDoTest() {
  const dispatch = useDispatch();
  const history = useHistory();
  const studentId = useSelector(selectStudentId);
  const { subjectid } = useParams<{ subjectid: string }>();
  const token = useSelector(selectStudentToken);
  const questions: IMultipleChoiceQuestion[] = useSelector(
    select3mcQuestionsForSubject
  );
  const subjects = useSelector(selectStudentSubjects);
  const [MCResults, setMCResults] = useState<TestResult>({
    question1: 0,
    question2: 0,
    question3: 0,
    answer1: '0',
    answer2: '0',
    answer3: '0',
  });
  const [testDone, setTestDone] = useState(false);
  const [blockNavigation, setBlockNavigation] = useState(true);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  useEffect(() => {
    dispatch(getMcQuestionsForTest(Number(subjectid)));
  }, [dispatch, subjectid]);

  const onPick = (event: any, questionNumber: number, questionId: number) => {
    if (questionNumber === 1) {
      event === 1 || event % 4 === 1
        ? setMCResults({ ...MCResults, question1: questionId, answer1: '1' })
        : setMCResults({ ...MCResults, question1: questionId, answer1: '0' });
    } else if (questionNumber === 2) {
      event === 1 || event % 4 === 1
        ? setMCResults({ ...MCResults, question2: questionId, answer2: '1' })
        : setMCResults({ ...MCResults, question2: questionId, answer2: '0' });
    } else {
      event === 1 || event % 4 === 1
        ? setMCResults({ ...MCResults, question3: questionId, answer3: '1' })
        : setMCResults({ ...MCResults, question3: questionId, answer3: '0' });
    }
  };

  const onFinish = () => {
    if (studentId) {
      setTestDone(true);
      dispatch(submitTest(Number(subjectid), MCResults));
      setMCResults({ ...MCResults, answer1: '0', answer2: '0', answer3: '0' });
      setBlockNavigation(false);
    }
  };

  const doAnotherTest = () => {
    setBlockNavigation(true);
    setTestDone(false);
    dispatch(getMcQuestionsForTest(Number(subjectid)));
  };

  const goToMain = () => {
    history.push(`/students/${studentId}/subjects/${subjectid}`);
  };

  const renderMCQ = () => {
    if (questions && subjects) {
      return (
        <>
          {questions.map(({ text, answers, id }, i) => (
            <MultipleChoiceQuestion
              key={i}
              text={text}
              answers={answers}
              onChange={onPick}
              questionNumber={i + 1}
              questionId={id}
            />
          ))}
          {!testDone ? (
            <Button
              style={{
                width: 160,
                backgroundColor: '#B81D9D',
                border: 'none',
                color: '#fff',
              }}
              onClick={onFinish}
            >
              Finish
            </Button>
          ) : null}
          {testDone ? (
            <>
              <p>{'You want to take another test?'.toUpperCase()}</p>
              <Button
                style={{
                  width: 160,
                  backgroundColor: '#4BC0E7',
                  border: 'none',
                  color: '#fff',
                  marginRight: 20,
                }}
                onClick={doAnotherTest}
              >
                yes
              </Button>
              <Button
                style={{
                  width: 160,
                  backgroundColor: '#B81D9D',
                  border: 'none',
                  color: '#fff',
                }}
                onClick={goToMain}
              >
                no
              </Button>
            </>
          ) : null}
        </>
      );
    }
  };

  return (
    <Layout>
      <NavigationPrompt
        beforeConfirm={(clb) => {
          studentId &&
            dispatch(
              submitTest(Number(subjectid), {
                question1: MCResults.question1,
                question2: MCResults.question2,
                question3: MCResults.question3,
                answer1: '0',
                answer2: '0',
                answer3: '0',
              })
            );
          clb();
        }}
        when={blockNavigation}
      >
        {({ onConfirm, onCancel }) => (
          <Modal
            visible
            title="Are you sure you want to leave?"
            onCancel={onCancel}
            onOk={onConfirm}
          >
            <div>
              If you leave this page your test score will be set to zero!
            </div>
          </Modal>
        )}
      </NavigationPrompt>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">{renderMCQ()}</Content>
      </Layout>
    </Layout>
  );
}
