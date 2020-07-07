import React from 'react';
import { Row, Radio, Select, Button } from 'antd';

const { Option } = Select;

export default function SortAndSelect({
  title,
  radio1,
  radio2,
  onChangeRadio,
  value,
  onChangeSelection,
  results,
  selectStudentAverage,
  onClick,
}) {
  return (
    <Row style={{ paddingBottom: 35 }}>
      {title}
      <Radio.Group
        size="small"
        style={{ marginLeft: 40 }}
        onChange={(e) => onChangeRadio(e.target.value)}
      >
        <Radio.Button value={radio1.toLowerCase()}>{radio1}</Radio.Button>
        <Radio.Button value={radio2.toLowerCase()}>{radio2}</Radio.Button>
      </Radio.Group>
      <Select
        size="small"
        style={{ width: 160 }}
        placeholder="Select a student"
        value={value}
        onChange={(e) => onChangeSelection(e)}
      >
        {results.map(({ name }, i) => (
          <Option key={i} value={name}>
            {name}
          </Option>
        ))}
      </Select>
      {selectStudentAverage ? (
        <Button size="small" onClick={onClick}>
          All students
        </Button>
      ) : null}
    </Row>
  );
}
