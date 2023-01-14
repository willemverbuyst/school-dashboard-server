import { Button, Radio, Row, Select } from "antd";

const { Option } = Select;

interface RadioButton {
  label: string;
  value: string;
}

interface Props {
  title: string;
  radio1: RadioButton;
  radio2: RadioButton;
  onChangeRadio: any;
  value: string | undefined;
  onChangeSelection: any;
  results: Array<string>;
  selectStudentData: string;
  onClick: any;
  placeholder: string;
  textBtn: string;
}

export function SortAndSelect({
  title,
  radio1,
  radio2,
  onChangeRadio,
  value,
  onChangeSelection,
  results,
  selectStudentData,
  onClick,
  placeholder,
  textBtn,
}: Props): JSX.Element {
  return (
    <Row style={{ paddingBottom: 35 }}>
      {title}
      <Radio.Group
        size="small"
        style={{ marginLeft: 40 }}
        onChange={(e) => onChangeRadio(e.target.value)}
      >
        <Radio.Button style={{ marginRight: 5 }} value={radio1.value}>
          {radio1.label}
        </Radio.Button>
        <Radio.Button style={{ marginRight: 5 }} value={radio2.value}>
          {radio2.label}
        </Radio.Button>
      </Radio.Group>
      <Select
        size="small"
        style={{ width: 160, marginRight: 5 }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeSelection(e)}
      >
        {results.map((option, i) => (
          <Option key={i} value={option}>
            {option}
          </Option>
        ))}
      </Select>
      {selectStudentData ? (
        <Button size="small" onClick={onClick}>
          {textBtn}
        </Button>
      ) : null}
    </Row>
  );
}
