import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTeacherSubjects,
  selectTeacherToken,
} from '../../../../store/teacher/selectors';
import { selectAllQuestionsForSubject } from '../../../../store/questions/selectors';
import SubjectSelector from './SubjectSelector';
import QuestionsAndAnswers from './QuestionsAndAnswers';
import Spinner from '../../../../components/Spinner';
import { getQuestionsForSubject } from '../../../../store/questions/actions';

const { Content } = Layout;

const ListOfQuestions = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const subjects = useSelector(selectTeacherSubjects);
  const questions = useSelector(selectAllQuestionsForSubject);
  const token = useSelector(selectTeacherToken);
  const [subject, setSubject] = useState(0);

  useEffect(() => {
    if (token === null) {
      history.push('/');
    }
  });

  const getListOfQuestions = (subjectId: number): void => {
    setSubject(subjectId);
    dispatch(getQuestionsForSubject(subjectId));
  };

  const renderQuestions = (): ReactElement | null =>
    questions ? (
      <Row justify="center">
        <QuestionsAndAnswers questions={questions} />
      </Row>
    ) : null;

  return (
    <Layout>
      <Layout style={{ padding: '24px', minHeight: '92vh' }}>
        <Content className="site-layout-background">
          {subjects ? (
            <>
              <Row justify="center" style={{ padding: '24px' }}>
                {'Select a subject to get all the current questions in the database for that subject.'.toUpperCase()}
              </Row>
              <Row justify="center">
                <SubjectSelector
                  subject={subject}
                  subjects={subjects}
                  changeSubject={(e: any) => getListOfQuestions(e)}
                />
              </Row>
            </>
          ) : (
            <Spinner />
          )}
          {renderQuestions()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ListOfQuestions;
