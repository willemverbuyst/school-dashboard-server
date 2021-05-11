import { ReactElement } from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

interface IAnswer {
  text: string;
  correct: boolean;
}

interface IQuestion {
  text: string;
  answers: IAnswer[];
}

interface IProps {
  questions: IQuestion[];
}

const QuestionsAndAnswers: React.FC<IProps> = ({
  questions,
}: IProps): ReactElement => {
  return (
    <Collapse style={{ width: 650 }}>
      {questions.map(({ text, answers }, i) => (
        <Panel header={text} key={i}>
          <ol>
            {answers.map(({ text, correct }, i) => (
              <li
                key={i}
                style={
                  !correct
                    ? { color: 'red' }
                    : { color: 'green', fontWeight: 'bold' }
                }
              >
                {text}
              </li>
            ))}
          </ol>
        </Panel>
      ))}
    </Collapse>
  );
};

export default QuestionsAndAnswers;
