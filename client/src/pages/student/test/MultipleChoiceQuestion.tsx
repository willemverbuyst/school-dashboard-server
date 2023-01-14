import { Col, Form, Radio, Row } from "antd";
import { RadioEvent } from "../../../models/events.models";
import { AnswerOptions } from "./AnswerOptions";

export interface MultipleChoiceAnswer {
  id: number;
  text: string;
  correct: boolean;
  questionId: number;
}

interface Props {
  text: string;
  answers: MultipleChoiceAnswer[];
  questionNumber: number;
  questionId: number;
  onChange: RadioEvent;
}

export function MultipleChoiceQuestion({
  text,
  answers,
  questionNumber,
  questionId,
  onChange,
}: Props): JSX.Element {
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
              <AnswerOptions answers={answers} />
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
