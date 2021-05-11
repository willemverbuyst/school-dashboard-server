import { ReactElement } from 'react';
import { Form, Input } from 'antd';

interface IProps {
  message: string;
  name: string;
  value: string;
  updateValue: (e: any) => void;
}

const TextInput: React.FC<IProps> = ({
  message,
  name,
  value,
  updateValue,
}: IProps): ReactElement => {
  return (
    <Form.Item name={name} rules={[{ required: true, message: message }]}>
      <Input
        placeholder={name}
        value={value}
        onChange={(e) => updateValue(e)}
      />
    </Form.Item>
  );
};

export default TextInput;
