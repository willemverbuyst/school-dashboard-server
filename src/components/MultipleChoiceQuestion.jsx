import React from 'react';
import { Radio, Form } from 'antd';

export default function MultipleChoiceQuestion({
  text,
  answers,
  onPick,
  questionNumber,
}) {
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  return (
    <>
      {text}
      <Form.Item>
        <Radio.Group onChange={(e) => onPick(e.target)}>
          {answers.map(({ text, id, questionId }, i) => (
            <Radio
              key={i}
              style={radioStyle}
              value={id}
              questionId={questionId}
              questionNumber={questionNumber}
            >
              {text}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </>
  );
}
