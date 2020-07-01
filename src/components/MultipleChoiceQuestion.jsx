import React, { useState } from 'react';
import { Radio, Form } from 'antd';

export default function MultipleChoiceQuestion({ text, answers }) {
  const [value, setValue] = useState('');

  const mixedAnswers = answers.map((a) => a.text);

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  return (
    <Form.Item label={text}>
      <br />
      <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
        <Radio style={radioStyle} value={1}>
          {mixedAnswers[0]}
        </Radio>
        <Radio style={radioStyle} value={2}>
          {mixedAnswers[1]}
        </Radio>
        <Radio style={radioStyle} value={3}>
          {mixedAnswers[2]}
        </Radio>
        <Radio style={radioStyle} value={4}>
          {mixedAnswers[3]}
        </Radio>
      </Radio.Group>
    </Form.Item>
  );
}
