import { Col, Form, Radio, Row } from 'antd'
import React, { ReactElement } from 'react'
import { RadioEvent } from '../../../models/events.models'

interface IMultipleChoiceAnswer {
  id: number
  text: string
  correct: boolean
  questionId: number
}

interface IMCquestionDisplay {
  text: string
  answers: IMultipleChoiceAnswer[]
  questionNumber: number
  questionId: number
  onChange: RadioEvent
}

const MultipleChoiceQuestion: React.FC<IMCquestionDisplay> = ({
  text,
  answers,
  questionNumber,
  questionId,
  onChange,
}: IMCquestionDisplay): ReactElement => {
  const generateOptions = (): ReactElement => {
    return (
      <>
        {answers.map(({ text, id }) => (
          <Radio
            key={id}
            style={{
              display: 'block',
              height: '30px',
              lineHeight: '30px',
            }}
            value={id}
          >
            {text}
          </Radio>
        ))}
      </>
    )
  }

  return (
    <>
      <Row>
        <Col>{text}</Col>
      </Row>
      <Row>
        <Col>
          <Form.Item>
            <Radio.Group
              onChange={(e) =>
                onChange(e.target.value, questionNumber, questionId)
              }
            >
              {generateOptions()}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default MultipleChoiceQuestion
