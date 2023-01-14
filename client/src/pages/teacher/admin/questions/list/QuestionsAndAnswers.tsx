import { Collapse, Row } from "antd";
import { Question } from "../../../../../models";

const { Panel } = Collapse;

interface Props {
  questions: Array<Question>;
}

export function QuestionsAndAnswers({ questions }: Props): JSX.Element {
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
                      ? { color: "red" }
                      : { color: "green", fontWeight: "bold" }
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
  );
}
