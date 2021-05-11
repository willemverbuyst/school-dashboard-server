import { ReactElement } from 'react';
import { Form, Input } from 'antd';

interface IProps {
  message: string;
  name: string;
  value: string;
  updateValue: (e: any, name: any) => void;
}

const FormItem: React.FC<IProps> = ({
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
        onChange={(e) => updateValue(e, name)}
      />
    </Form.Item>
  );
};

export default FormItem;
