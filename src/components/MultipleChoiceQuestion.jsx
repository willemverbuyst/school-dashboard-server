import React, { useState } from 'react';
import { Radio, Form } from 'antd';

export default function MultipleChoiceQuestion() {
  const [value, setValue] = useState('');

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  return (
    <Form.Item label="Question 1">
      <br />
      <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
        <Radio style={radioStyle} value={1}>
          Option A
        </Radio>
        <Radio style={radioStyle} value={2}>
          Option B
        </Radio>
        <Radio style={radioStyle} value={3}>
          Option C
        </Radio>
        <Radio style={radioStyle} value={4}>
          Option D
        </Radio>
      </Radio.Group>
    </Form.Item>
  );
}
