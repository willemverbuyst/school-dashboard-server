import { Col, Row } from "antd";
import { BarChartTest } from "../../../components/charts";

export interface TestResult {
  numberOfTests: number;
  score: number;
  studentId: string;
  subjectName: string;
  userName: string;
}

interface Props {
  results: Array<TestResult>;
}

export function BarChartTestsSubject({ results }: Props): JSX.Element {
  return (
    <Row justify={"space-around"}>
      {results.map(({ numberOfTests, score, userName }, i) => (
        <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
          <BarChartTest
            data={[score]}
            color={["#008080"]}
            labels={[`${userName}: ${numberOfTests} tests`]}
            title={""}
          />
        </Col>
      ))}
    </Row>
  );
}
