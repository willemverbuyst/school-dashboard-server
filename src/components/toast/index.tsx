import { message, Space } from 'antd';

interface IProps {
  text: string;
  status: 'success' | 'error' | 'warning';
}

export const Toast = ({ text, status }: IProps) => {
  return <Space>{message[status](text)}</Space>;
};
