import React, { ReactElement } from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

interface ISubject {
  name: string;
  id: number;
}

interface IProps {
  subject: number;
  subjects: ISubject[];
  changeSubject: any;
}

const SubjectSelector: React.FC<IProps> = ({
  subject,
  subjects,
  changeSubject,
}: IProps): ReactElement => {
  const renderSubjects = (): ReactElement => {
    return (
      <>
        {subjects.map(({ name, id }, i) => (
          <Option key={i} value={id}>
            {name}
          </Option>
        ))}
      </>
    );
  };

  return (
    <Form
      style={{ justifyContent: 'center' }}
      name="basic"
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="subject"
        rules={[{ required: true, message: 'Please select a subject' }]}
      >
        <Select
          placeholder="select a subject"
          value={subject}
          style={{ width: 160 }}
          onChange={(e) => changeSubject(e)}
        >
          {renderSubjects()}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SubjectSelector;
