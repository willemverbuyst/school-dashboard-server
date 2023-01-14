import { Radio } from "antd";
import { MultipleChoiceAnswer } from "./MultipleChoiceQuestion";

interface Props {
  answers: MultipleChoiceAnswer[];
}

export function AnswerOptions({ answers }: Props): JSX.Element {
  return (
    <>
      {answers.map(({ text, id }) => (
        <Radio
          key={id}
          style={{
            display: "block",
            height: "30px",
            lineHeight: "30px",
          }}
          value={id}
        >
          {text}
        </Radio>
      ))}
    </>
  );
}
