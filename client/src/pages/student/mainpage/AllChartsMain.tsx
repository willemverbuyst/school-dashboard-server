import { Col, Row } from "antd";
import { TestWithScores } from "../../../models/api/user.api";
import { BarChartMain } from "./BarChartMain";
import { DoughnutChartMain } from "./DoughnutChartMain";
import { PolarChartMain } from "./PolarChartMain";

interface Props {
  subjects: TestWithScores[] | any;
  results: any;
}

export function AllCharts({ subjects, results }: Props): JSX.Element {
  const subjectIds: number[] = subjects.map((subject) => subject.id);

  const subjectSorted = subjectIds.map((id) =>
    results.filter((result) => result.subject.id === id)
  );

  const averages: number[] = subjectSorted.map((subject) =>
    Math.round(
      (subject.reduce((a, b) => a + b.score * 1, 0) / (subject.length * 3)) *
        100
    )
  );

  return (
    <>
      <Row justify="space-around">
        <Col style={{ width: 450, paddingBottom: 80 }}>
          <DoughnutChartMain averages={averages} />
        </Col>
        <Col style={{ width: 450, paddingBottom: 80 }}>
          <BarChartMain averages={averages} subjects={subjects} />
        </Col>
      </Row>
      <Row justify="center">
        <Col style={{ width: 650 }}>
          <PolarChartMain subjectSorted={subjectSorted} subjects={subjects} />
        </Col>
      </Row>
    </>
  );
}
