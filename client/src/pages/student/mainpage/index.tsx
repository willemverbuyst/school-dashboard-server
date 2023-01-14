import { Layout } from "antd";
import { useEffect } from "react";
import { useStudentGuard, useUser } from "../../../hooks";
import { AllCharts } from "./AllChartsMain";

const { Content } = Layout;

export function StudentMainPage(): JSX.Element {
  const { user } = useUser();
  const testResults = user?.data?.overview?.data || [];
  const subjects = user?.data?.subjects?.data || [];
  const { studentGuard } = useStudentGuard();

  useEffect(() => studentGuard());

  return (
    <Content className="site-layout-content">
      <AllCharts subjects={subjects} results={testResults} />
    </Content>
  );
}
