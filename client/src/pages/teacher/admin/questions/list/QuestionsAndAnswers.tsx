import { Collapse, Row } from 'antd'
import { ReactElement } from 'react'
import { Question } from '../../../../../models'

const { Panel } = Collapse

interface IProps {
  questions: Array<Question>
}

export default function QuestionsAndAnswers({
  questions,
}: IProps): ReactElement {
  return (
    <Row justify="center">
      <Collapse style={{ width: 650 }}>
        {questions.map(({ id, text, answers }) => (
          <Panel header={text} key={id}>
            <ol>
              {answers.map(({ id, text, correct }) => (
                <li
                  key={id}
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
    </Row>
  )
}
