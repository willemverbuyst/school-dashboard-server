import { message, Space } from "antd";

interface Props {
  text: string;
  status: "success" | "error" | "warning";
}

export function Toast({ text, status }: Props): JSX.Element {
  return <Space>{message[status](text)}</Space>;
}
