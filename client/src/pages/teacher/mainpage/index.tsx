import { Layout, Row } from "antd";
import { useEffect } from "react";
import { Spinner } from "../../../components/spinner";
import { useTeacherGuard, useUser } from "../../../hooks";
import { BarChartMain } from "./BarChartMain";
import { LineChartMain } from "./LineChartMain";
import { PieChartMain } from "./PieChartMain";
import { ScatterChartMain } from "./ScatterChartMain";

const { Content } = Layout;

export function TeacherMainPage(): JSX.Element {
  const { user } = useUser();
  const tests = user?.data?.overview?.data?.testsWithSummedScores || [];
  const subjects = user?.data.subjects.data || [];
  const { teacherGuard } = useTeacherGuard();

  useEffect(() => teacherGuard());

  return (
    <Content className="site-layout-content" style={{ padding: 90 }}>
      {subjects ? (
        <>
          <Row justify="space-around">
            <BarChartMain tests={tests} subjects={subjects} />
            <PieChartMain tests={tests} />
          </Row>
          <Row justify="space-around">
            <LineChartMain tests={tests} />
            <ScatterChartMain tests={tests} />
          </Row>
        </>
      ) : (
        <Spinner />
      )}
    </Content>
  );
}
