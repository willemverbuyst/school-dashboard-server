import { Col, Row } from "antd";
import { DoughnutChart } from "../../../components/charts";
import { TestResult } from "./BarChartTestsSubject";

interface Props {
  results: TestResult[];
}

export function DoughnutChartSubject({ results }: Props): JSX.Element {
  return (
    <Row justify={"space-around"}>
      {results.map(({ numberOfTests, score, userName }, i) => (
        <Col key={i} style={{ width: 350, paddingBottom: 80 }}>
          <DoughnutChart
            data={[
              (score / 3) * numberOfTests,
              100 - (score / 3) * numberOfTests,
            ]}
            color={["#008080", "#eee"]}
            title={`${userName} ${Math.round((score / 3) * numberOfTests)}%`}
          />
        </Col>
      ))}
    </Row>
  );
}
