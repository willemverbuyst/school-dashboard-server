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
  placeholder,
  textBtn,
}) {
  return (
    <Row style={{ paddingBottom: 35 }}>
      {title}
      <Radio.Group
        size="small"
        style={{ marginLeft: 40 }}
        onChange={(e) => onChangeRadio(e.target.value)}
      >
        <Radio.Button style={{ marginRight: 5 }} value={radio1.toLowerCase()}>
          {radio1}
        </Radio.Button>
        <Radio.Button style={{ marginRight: 5 }} value={radio2.toLowerCase()}>
          {radio2}
        </Radio.Button>
      </Radio.Group>
      <Select
        size="small"
        style={{ width: 160, marginRight: 5 }}
        placeholder={placeholder}
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
          {textBtn}
        </Button>
      ) : null}
    </Row>
  );
}
